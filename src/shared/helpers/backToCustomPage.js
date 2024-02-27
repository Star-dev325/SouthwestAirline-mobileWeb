function backToCustomPage(Handler, state, configurations) {
  const currentRoutes = state.routes;

  if (!currentRoutes) {
    return;
  }

  const currentRouteName = currentRoutes[currentRoutes.length - 1].name;

  configurations.forEach((configuration) => {
    if (configuration.fromPath === currentRouteName && state.action === 'pop') {
      Handler.replaceWith(configuration.toPath);
    }
  });
}

export default backToCustomPage;
