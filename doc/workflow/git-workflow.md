# Git Workflow (GitHub Flow)

## Branching Workflow Strategy

> We are using the [GitHub Flow](https://guides.github.com/introduction/flow/) branching workflow strategy which is used by most SWA teams including iOS and dotcom.

### Steps

- Create your working branch, e.g. `mob-1234`
- Complete your work including adding/updating tests as appropriate.
- Run test locally, make sure every test pass. -- `npm run test`
- Commit.
- Rebase master. -- `git rebase master`
- Push your code. -- `git push origin mob-1234:mob-1234`
- Create Pull Request. -- `npm run pr`
- Respond to questions and comments from the reviewers. Update Pull Request if needed. -- `You should push the new commits directly instead of create a new PR`
- Verify mweb-pull-request job passed.
- Merge code to master. Two approvals are required.
- Verify mweb-master-pipleline job passed.

### Code conflict steps

- Fetch the newest master code. -- `git checkout master && git pull --rebase`
- Rebase the master code and fix the code conflict. -- `git checkout mob-1234 && git rebase master`

### Naming Conventions

| Type          | Convention                                                          | Example                                                 |
| ------------- | ------------------------------------------------------------------- | ------------------------------------------------------- |
| Pull Requests | **MOB-StoryNumber** or **mob-StoryNumber**                          | **MOB-26** or **mob-26**                                |
| Commits       | [Developer1Name\|Developer2Name] - MOB-StoryNumber - Commit Message | [Andrew\|Xianning] - MOB-26 - Upgrade APIs to fix login |
