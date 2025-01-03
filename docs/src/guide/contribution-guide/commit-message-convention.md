---
outline: deep
---

# Commit message convention

This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages.

The commit message should be structured as follows:

```
<type>([optional scope]): <subject>

[optional body]

[optional footer(s)]
```

## Type

Allowed `<type>` values:

- feat (new feature for the user, not a new feature for build script)
- fix (bug fix for the user, not a fix to a build script)
- docs (changes to the documentation)
- style (formatting, missing semi colons, etc; no production code change)
- refactor (refactoring production code, eg. renaming a variable)
- perf (optimize production code, eg. optimize query)
- test (adding missing tests, refactoring tests; no production code change)
- chore (updating grunt tasks etc; no production code change)
- revert (revert commit)

## Revert

If the commit reverts a previous commit, it should begin with revert:, followed by the header of the reverted commit. In the body it should say: This reverts commit `<hash>`, where the hash is the SHA of the commit being reverted.

## Scope

Scope must be noun and it represents the section of the section of the codebase

Example `(scope)` values:
- init
- runner
- watcher
- config
- web-server
- proxy

The `<scope>` can be empty (e.g. if the change is a global or difficult to assign to a single component), in which case the parentheses are omitted.

## Subject

`<subject>` uses the imperative, present tense: “change” not “changed” nor “changes”
includes motivation for the change and contrasts with previous behavior

- don't use dot(.) at end
- don't capitalize first letter

## Body

The body can be more detailed, but each line should generally be kept under 80 characters for readability.

If your commit includes multiple changes, use bullet points to list them clearly in the body of the message.

```sh
Improve database query performance

- Replaced inefficient queries with optimized versions
- Added database indexing to speed up search operations
- Updated caching mechanism to store frequently accessed data
```

## Footer

Footer should contain any information about Breaking Changes and is also the place to reference GitHub issues that this commit Closes.


### Referencing issues

Closed issues should be listed on a separate line in the footer prefixed with "Closes" keyword like this:

```
Closes #234
```

or in the case of multiple issues:

```
Closes #123, #245, #992
```

### Breaking changes

All breaking changes have to be mentioned in footer with the description of the change, justification and migration notes.

```
BREAKING CHANGE:

`port-runner` command line option has changed to `runner-port`, so that it is
consistent with the configuration file syntax.

To migrate your project, change all the commands, where you use `--port-runner`
to `--runner-port`.
```

## References

https://www.conventionalcommits.org/en/v1.0.0/#specification