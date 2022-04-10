const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    
    const tagName = core.getInput('tag_name');
    const commithash = core.getInput('commit_sha');
    const myToken = core.getInput('token');

    const octokit = github.getOctokit(myToken)

    // You can also pass in additional options as a second parameter to getOctokit
    // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});

    try {
                await github.git.deleteRef({
                  owner: context.repo.owner,
                  repo: context.repo.repo,
                  ref: "tags/" + tagName
                })
            } catch (e) {
              console.log("The nightly tag doesn't exist yet: " + e)
            }
            await github.git.createRef({
              owner: context.repo.owner,
              repo: context.repo.repo,
              ref: "refs/tags/" + tagName,
              sha: context.sha
            })

    console.log(pullRequest);
}

run();
