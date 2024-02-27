#!/usr/bin/groovy

import groovy.transform.Field

import javax.management.remote.JMXConnector
import javax.management.remote.JMXConnectorFactory as JmxFactory
import javax.management.remote.JMXServiceURL as JmxUrl
import javax.management.remote.rmi.RMIConnectorServer
import javax.rmi.ssl.SslRMIClientSocketFactory

@Field environments = [
        itest1: [
                [host: "xltlft07"],
                [host: "xltlft08"]
        ],
        itest2: [
                [host: "xltlft09"],
                [host: "xltlft10"]
        ],
        itest3: [
                [host: "xltlft11"],
                [host: "xltlft12"]
        ],
        qa1: [
                [host: "xlqlft07"],
                [host: "xlqlft08"]
        ],
        qa2: [
                [host: "xlqlft09"],
                [host: "xlqlft10"],
                [host: "xlqlft11"],
                [host: "xlqlft12"]
        ],
        qa3: [
                [host: "xlqlft13"],
                [host: "xlqlft14"]
        ],
        qa4: [
                [host: "xlqlft15"],
                [host: "xlqlft16"]
        ],
        qa5: [
                [host: "xlqlft29"],
                [host: "xlqlft30"]
        ],
        qa6: [
                [host: "xlqlft31"],
                [host: "xlqlft32"]
        ],
        qa7: [
                [host: "xlqlft33"],
                [host: "xlqlft34"]
        ]
]

@Field accountsJmxPort = 24235

def setSessionTimeout(hostname, port, username, password, duration) {

    def jmxUrl = "service:jmx:rmi://$hostname:$port/jndi/rmi://$hostname:$port/jmxrmi"
    def beanName = new javax.management.ObjectName("com.swacorp.dotcom.api:name=TokenExpirationManager")
    def env = [(JMXConnector.CREDENTIALS): (String[]) ["$username", "$password"]]
    if(hostname != "localhost") {
        SslRMIClientSocketFactory csf = new SslRMIClientSocketFactory()
        env.put((RMIConnectorServer.RMI_CLIENT_SOCKET_FACTORY_ATTRIBUTE), csf)
        env.put("com.sun.jndi.rmi.factory.socket", csf)
    }
    def connector = JmxFactory.connect(new JmxUrl(jmxUrl), env)
    def server = connector.MBeanServerConnection

    server.invoke(beanName, 'setHotDurationMinutes', [duration] as Object[], [int.class.getName()] as String[])
}


def main(String[] argv) {

    def cli = new CliBuilder(usage: 'setSessionTimeout <environment> <durationMinutes>')
    cli.width = 140
    cli.user(args: 1, argName: 'username', 'Your XId (you will be prompted if this is not set)')
    cli.pass(args: 1, argName: 'password', 'Your XId Password (you will be prompted if this is not set)')
    cli.h('display this info')

    def options = cli.parse(argv)
    def optArray = options.arguments()

    if (optArray.size() < 2 || options.h) {
        cli.usage()
        print "\nexample usages:" +
              "\nsetSessionTimeout.sh dev1 10" +
              "\n\n"
        return
    }

    def env
    int timeout
    def user
    def pass

    if (optArray.size() != 2) {
        cli.usage()
        return
    }

    env = optArray[0].toLowerCase()
    timeout = (int)Integer.parseInt(optArray[1])

    if (options.user && options.pass) {
        user = options.user
        pass = options.pass
    } else {
        def console = System.console()
        user = console.readLine("User:")
        pass = console.readPassword("Password:")
    }

    def environmentsToToggle = environments.getAt(env)

    environmentsToToggle.each() { environmentToToggle ->
        try {
            setSessionTimeout(environmentToToggle.host, accountsJmxPort, user, pass, timeout)
            logSuccess(environmentToToggle.host)
        }
        catch(Exception e) {
            logFailure(environmentToToggle.host, e)
        }
    }
}

def logSuccess(host) {
    println "${greenText("SUCCESS")}: $host"
}

def logFailure(host, exception) {
    println "${redText("FAILURE")}: $host - $exception"
}

def redText(text) {
    "\033[1;31m${text}\033[0m"
}

def greenText(text) {
    "\033[1;32m${text}\033[0m"
}

System.setProperty('javax.rmi.ssl.client.enabledCipherSuites', 'TLS_DH_anon_WITH_AES_128_CBC_SHA')

main(args)
