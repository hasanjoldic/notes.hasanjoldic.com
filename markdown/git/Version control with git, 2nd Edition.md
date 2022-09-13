---
title: "Version control with git, 2nd Edition"
date: "2022-08-22"
urls:
  - https://enki.fra1.digitaloceanspaces.com/Version%20Control%20with%20Git,%202nd%20Edition.pdf
---

## File Management and the Index

When your project is under the care of a VCS, you edit in your working
directory and commit your changes to your repository for safekeeping.
Git works similarly but inserts another layer, the _index_, between
the working directory and the repository to _stage_, or collect,
alterations. When you manage your code with Git, you edit in your
working directory, accumulate changes in your index, and commit whatever
has amassed in the index as a single changeset.
You can think of Git’s index as a set of intended or prospective
modifications. You add, remove, move, or repeatedly edit files right up
to the culminating commit, which ac- tualizes the accumulated changes in
the repository. Most of the critical work actually precedes the commit
step.

### File Classifications in Git

Git classifies your files into three groups: tracked, ignored, and
untracked.

- **Tracked** is any file already in the repository or any file that is staged in the index. To add a new file <b>somefile</b> to this group, run `git add somefile`

- **Ignored** must be explicitly declared invisible or ignored in the repository even though it may be present within your working directory. A software project tends to have a good number of ignored files. Common ignored files include temporary and scratch files, personal notes, compiler output, and most files generated automatically during a build.
  Git maintains a default list of files to ignore, and you can configure your repository to recognize others.

- **Untracked** is any file not found in either of the previous two categories. Git considers the entire set of files in your working directory and subtracts both the tracked files and the ignored files to yield what is untracked.

In any event, the important thing to remember is that the version of a file in your working directory can be out of sync with the version staged in the index. When it comes time to make a commit, Git uses the version in the index.

## Using git rm

The command `git rm` is, naturally the inverse of `git add`. It removes a file from both the repository and the working directory. However, because removing a file tends to be more problematic (if something goes wrong) than adding a file, Git treats the removal of a file with a bit more care. Git will remove a file only from the index or from the index and working directory simultaneously. Git will not remove a file just from the working directory; the regular rm command may be used for that purpose.

Removing a file from your directory and the index does not remove the file’s existing history from the repository. Any versions of the file that are part of its history already committed in the repository remain in the object store and retain that history.
Because `git rm` is also an operation on the index, the command won’t work on a file that hasn’t been previously added to the epository or index; Git must first be aware of a file.

To convert a file from staged to unstaged, use `git rm --cached`. Whereas `git rm --cached` removes the file from the index and leaves it in the working directory, `git rm` removes the file from both the index and the working directory.
Before Git removes a file, it checks to make sure the version of the file in the working directory matches the latest version in the current branch (the version that Git com- mands call the HEAD). This verification precludes the accidental loss of any changes (due to your editing) that may have been made to the file.
Usegit `rm -f` to force the removal of your file. Force is an explicit mandate and removes the file even if you have altered it since your last commit.

And in case you really meant to keep a file that you accidentally removed, simply add it back:

```
$ git add data fatal: path
```

output:

```
spec 'data' did not match any files
```

Darn! Git removed the working copy, too! But don’t worry. VCSs are good
at recovering old versions of files:

```
$ git checkout HEAD -- data $ cat data
$ git status
```

output:

```
# On branch master
nothing to commit (working directory clean)
```

## Using git mv

Suppose you need to move or rename a file. You may use a combination of git rm on the old file and git add on the new file, or ou may use git mv directly. Given a repository with a file named stuff that you want to rename newstuff, the following sequences of commands are equivalent Git operations:

```
$ mv stuff newstuff
$ git rm stuff
$ git add newstuff
```

and

```
$ git mv stuff newstuff
```

In both cases, Git removes the pathname stuff from the index, adds a new pathname newstuff, keeps the original content for stuff in the object store, and reassociates that content with the pathname newstuff.

### Commits

In Git, a _commit_ is used to record changes to a repository.

## refs and symrefs

A ref is an SHA1 hash ID that refers to an object within the Git object store. Although a ref may refer to any Git object, it usually refers to a commit object. A symbolic reference, or symref, is a name that indirectly points to a Git object. It is still just a ref.
Local topic branch names, remote tracking branch names, and tag names are all refs.
Each symbolic ref has an explicit, full name that begins with `refs/` and each is stored hierarchically within the repository in the `.git/refs/` directory. There are basically three different namespaces represented in refs/:

- `refs/heads/ref` for your local branches,
- `refs/remotes/ref` for your remote tracking branches, and
- `refs/tags/ref` for your tags.

For example, a local topic branch named dev is really a short form of `refs/heads/dev`. Remote tracking branches are in the `refs/remotes/` namespace, so `origin/master` really names `refs/remotes/origin/master`.And finally, a tag such as v2.6.23 is short for refs/tags/v2.6.23.

You can use either a full ref name or its abbreviation, but if you have a branch and a tag with the same name, Git applies a disambiguation heuristic and uses the first match according to this list from the git rev-parse manpage:

- **.git/ref**
- **.git/refs/ref**
- **.git/refs/tags/ref**
- **.git/refs/heads/ref**
- **.git/refs/remotes/ref**
- **.git/refs/remotes/ref/HEAD**

The first rule is usually just for a few refs described later: HEAD, ORIG_HEAD, FETCH_HEAD, CHERRY_PICK_HEAD, and MERGE_HEAD.

- **HEAD**

HEAD always refers to the most recent commit on the current branch. When you change branches, HEAD is updated to refer to the new branch’s latest commit.

- **ORIG_HEAD**

Certain operations, such as merge and reset, record the previous version of HEAD in ORIG_HEAD just prior to adjusting it to a new value. You can use ORIG_HEAD to recover or revert to the previous state or to make a comparison.

- **FETCH_HEAD**

When remote repositories are used, git fetch records the heads of all branches fetched in the file .git FETCH_HEAD is a shorthand for the head of the last branch fetched and is valid only immediately after a fetch operation. Using this symref,you can find the HEAD of commits from git fetch even if ananonymous fetch that doesn’t specifically name a branch is used.

- **MERGE_HEAD**

When a merge is in progress, the tip of the other branch is temporarily recorded in the symref MERGE_HEAD. In other words, MERGE_HEAD is the commit that is being merged into HEAD.

## Relative Commit Names

Git also provides mechanisms for identifying a commit relative to another reference, commonly the tip of a branch. You’ve seen some of these names already, such as `master` and `master^`, where `master^` always refers to the penultimate commit on the master branch. There are others as well: you can use `master^^`, `master~2`, and even a complex name like `master~10^2~2^2`.

Except for the first root commit, each commit is derived from at least one earlier commit and possibly many, where direct ancestors are called parent commits. For a commit to have multiple parent commits, it must be the result of a merge operation. As a result, there will be a parent commit for each branch contributing to a merge commit.

Within a single generation, the caret is used to select a different parent. Given a commit `C`, `C^1` is the first parent, `C^2 `is the second parent, `C^3` is the third parent, and so on.
The tilde is used to go back before an ancestral parent and select a preceding generation. Again, given the commit `C`, `C~1` is the first parent, `C~2` is the first grandparent, and `C~3` is the first great-grandparent. When there are multiple parents in a generation, the first parent of the first parent is followed.

Git supports other abbreviations and combinations as well. The abbreviated forms `C^` and `C~` are the same as `C^1` and `C~1`, respectively. Also, `C^^` is the same as `C^1^1` and, because that means the "first parent of the first parent of commit C," it refers to the same commit as `C~2`.
