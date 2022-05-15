# git

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h287xxeqpoj20wk09g3zi.jpg)

```
- Workspace：工作区
- Index / Stage：暂存区
- Repository：仓库区（或本地仓库）
- Remote：远程仓库
```

```
start a working area (see also: git help tutorial)
   clone             Clone a repository into a new directory
   init              Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add               Add file contents to the index
   mv                Move or rename a file, a directory, or a symlink
   restore           Restore working tree files
   rm                Remove files from the working tree and from the index
   sparse-checkout   Initialize and modify the sparse-checkout

examine the history and state (see also: git help revisions)
   bisect            Use binary search to find the commit that introduced a bug
   diff              Show changes between commits, commit and working tree, etc
   grep              Print lines matching a pattern
   log               Show commit logs
   show              Show various types of objects
   status            Show the working tree status

grow, mark and tweak your common history
   branch            List, create, or delete branches
   commit            Record changes to the repository
   merge             Join two or more development histories together
   rebase            Reapply commits on top of another base tip
   reset             Reset current HEAD to the specified state
   switch            Switch branches
   tag               Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch             Download objects and refs from another repository
   pull              Fetch from and integrate with another repository or a local branch
   push              Update remote refs along with associated objects
```

## 常用命令

git basic:

```shell
$ git init <directory> # 在指定⽬录创建repo，不带参数将在当前⽬录创建
$ git clone <repo> # 克隆⼀个repo到本地，repo可以是本地⽂件系统、HTTP或SSH地址
$ git config user.name <name> # 针对当前repo配置⽤户名，--global 配置全局⽤户名

$ git status # 显示哪些⽂件已被staged、未被staged以及未跟踪(untracked)
$ git add . # 将所有修改加⼊到 stage
$ git commit -m <message> # 提交暂存区的修改，message 作为提交信息
$ git log # 以缺省格式显示全部commit历史
```

git diff:

```shell
$ git diff # ⽐较⼯作区和暂存区的修改。
$ git diff HEAD # ⽐较⼯作区和上⼀次commit后的修改。
$ git diff --cached # ⽐较暂存区和上⼀次commit后的修改。
$ git show <commit-id> # 查看某个commit的修改
```

rewriting git history:

```shell
$ git commit -m <message> --amend # 将当前staged修改合并到最近⼀次的commit中
$ git rebase <base> # 基于base对当前分⽀rebase，base可以是commit、分⽀名、tag或commit
$ git reflog # 显示所有commit⽇志，包括版本回退的历史
```

git branchs:

```shell
$ git branch # 显示本地所有分⽀
$ git branch <branch> # 创建一个新分支
$ git switch <branch> # 切换到已有分支
$ git switch -c <branch> # 创建并切换到<branch>分⽀
$ git merge <branch> # 将指定 branch 分⽀合并到当前分⽀
$ git branch -d <branch> # 删除分支
```

remote repositories:

```shell
$ git remote add <name> <url> # 添加新的远程仓库，添加后可使⽤name作为远程连接的名称。
$ git fetch <remote> <branch> # 下载远端仓库的一个分支，去掉branch将抓取所有分⽀。
$ git pull <remote> # 从指定<remote>抓取所有分⽀的commit并⽴刻合并到本地repo。
$ git push <remote> <branch> # push本地分支到远端，如果远端没有对应的分⽀，将⾃动创建分⽀
```

git config:

```shell
$ git config --global user.name <name> # 配置⽤户名
$ git config --global user.email <email> # 配置⽤户Email
$ git config --global alias.<alias-name> <git-command> # 配置别名
$ git config --system core.editor <editor> # 配置⽂本编辑器，默认vi编辑器
$ git config --global --edit # 编辑器打开git全局配置
```

git log:

```shell
$ git log -<limit> # 限制log的显示数量。例如：”git log -5”仅显示最新5条commit。
$ git log --oneline # 每⾏显示⼀条commit。
$ git log --graph # 使⽤--graph参数显示图形化的branch信息。
$ git log --grep=<pattern> # 按指定内容搜索并显示commit。
$ git log --author=<pattern> # 按提交者名字搜索并显示commit。
$ git log --<file> # 仅显示包含指定⽂件修改的commit。
$ git log <since> <until> # 显示指定范围的commit。可以是commit ID、分⽀名称、HEAD
```

git reset:

```shell
$ git reset # 清除暂存区，⼯作区状态不变
$ git reset <file> # 将file从暂存区移除，⼯作区不变
$ git reset --hard # 清空暂存区和工作区的所有修改
$ git reset <commit> # 当前分⽀回滚到指定commit，清除暂存区，⼯作区状态不变
$ git reset --hard <commit> # 当前分⽀回滚到指定commit，清除暂存区和工作区
```

git rebase:

```shell
$ git rebase -i <startpoint> <endpoint> # 以交互模式rebase。
```

git pull / git push:

```shell
$ git pull <remote> # 抓取所有远程分⽀并merge
$ git push <remote> --force # 将本地分⽀推送到远程，慎用--force参数
$ git push <remote> --tags # push命令不会⾃动将本地tag推送到远程。需要--tags
```

git tag:

```shell
$ git tag # 查看所有标签
$ git tag <tagname> <commit-id> # 新建标签，默认为指向 HEAD，也可以指定 commit id
$ git tag -a <tagname> -m "tag message" # 指定标签信息，-a 指定标签名
$ git show <tagname> # 查看一个 tag 的信息

$ git push origin <tagname> # push 本地标签
$ git push origin --tags # 推送全部未推送过的本地标签
$ git tag -d <tagname> # 删除本地标签
$ git push origin :refs/tags/<tagname> # 删除远程标签。
```

## 工作区和暂存区

一个 git repo 是由 `.git` 文件夹管理的，里面有暂存区( stage 或 index )，各个分支( branch )，以及指向版本的 HEAD 指针，`.git` 之外的称为工作区。

```shell
$ ll .git
total 96
-rw-r--r--    1 yams  staff     4B  5 15 16:09 COMMIT_EDITMSG
-rw-r--r--    1 yams  staff   101B  5 12 20:25 FETCH_HEAD
-rw-r--r--    1 yams  staff    23B  8 17  2021 HEAD
-rw-r--r--    1 yams  staff    41B  5 11 21:08 ORIG_HEAD
-rw-r--r--    1 yams  staff   377B  5 12 20:25 config
-rw-r--r--    1 yams  staff    73B 11 19  2019 description
drwxr-xr-x   33 yams  staff   1.0K 11 20  2019 hooks
-rw-r--r--    1 yams  staff    19K  5 15 16:09 index
drwxr-xr-x    3 yams  staff    96B 11 19  2019 info
drwxr-xr-x    4 yams  staff   128B 11 15  2021 lfs
drwxr-xr-x    4 yams  staff   128B 11 19  2019 logs
drwxr-xr-x  255 yams  staff   8.0K  5 15 16:09 objects
-rw-r--r--    1 yams  staff   114B  8 23  2021 packed-refs
drwxr-xr-x    5 yams  staff   160B 11 19  2019 refs
```

工作区的所有修改，比如增加文件，删除文件，修改文件内容，都需要添加到暂存区，然后才能 commit。

```shell
$ git init
$ touch hello
$ git add hello
```

1. 如果修改了工作区文件的内容，需要丢弃工作区的修改，使用命令 `git checkout -- file`
2. 如果不但修改了工作区文件的内容，还添加到了暂存区，需要丢弃修改，先用命令 `git reset HEAD <file>` 回到第一种情况，然后 `git checkout -- file`


3. 已经提交了不合适的修改到版本库时，想要撤销本次提交，此时需要版本回退，使用命令 `git reset --hard HEAD^`，前提是没有推送到远程库。

`git checkout` 就是用版本库( 暂存区或已经 commit )版本替换工作区版本，无论工作区是修改还是删除，都可以替换。

## 远程仓库( remote )

```shell
$ git remote -v                          # 查看已有远程仓库
$ git remote add <name> <repo-url>       # 添加远程仓库，可以是 https 或 ssh 地址
$ git remote set-url <name> <repo-url>   # 修改一个远程仓库的地址
$ git remote rename <name> <new-name>    # 重命名一个已有的远程仓库名
$ git remote rm <name>                   # 移除一个远程仓库
```



```shell
$ git remote rm hello
```

从存储库中删除远程 URL 只会取消本地和远程存储库的链接。 它不会删除远程存储库。

来做个小实验，先初始化一个 repo：

```shell
$ git init vscode
$ cd vscode
```

此时还没有远程仓库，将 vscode 作为远程仓库地址，命名为 origin：

```shell
$ git remote add origin git@github.com:microsoft/vscode.git
$ git remote -v
origin	git@github.com:microsoft/vscode.git (fetch)
origin	git@github.com:microsoft/vscode.git (push)
```

如果有 commit 需要 push 到 github 的远程仓库的 master 分支：

```shell
$ git push origin master
```

将 origin 改名为 vscode：

```shell
$ git remote rename origin vscode
$ git remote -v
vscode	git@github.com:microsoft/vscode.git (fetch)
vscode	git@github.com:microsoft/vscode.git (push)
```

push 命令要相应改为

```shell
$ git push vscode master
```

将 https 协议改为 ssh 地址：

```sshell
$ git remote set-url vscode https://github.com/microsoft/vscode.git
$ git remote -v
vscode	https://github.com/microsoft/vscode.git (fetch)
vscode	https://github.com/microsoft/vscode.git (push)
```

删除远程仓库：

```
$ git remote rm vscode
```

从存储库中删除远程 URL 只会取消本地和远程存储库的链接。 它不会删除远程存储库。

## git 变基( rebase )

`git rebase` 可以对一段 commit 历史进行编辑，合理使用可以使提交历史变得简洁。

同时，和所有会改变提交历史的命令一样，在 commit 已经 push 到远端仓库的情况下不建议使用，否则会造成麻烦。

我们可以用 `git rebase` 合并多个 commit。

```shell
$ git rebase -i [startpoint] [endpoint]
```

其中 `--interactive` 表示弹出交互式界面来编辑具体合并操作，`[startpoint] [endpoint]` 则指定了 rebase 的编辑区间，`[endpoint]` 默认是 `HEAD`。( 注意这是一个**左开右闭**区间 )

假设当前有 4 个 commit，我们将新的 2 个 commit 合并为 1 个：

```shell
$ git log --oneline
77b14bc (HEAD -> master) commit4
f7233cf commit3
61a55fb commit2
4af1183 commit1
```

```shell
$ git rebase -i 61a55fb # 61a55fb 是 commit2 的 commit id
```

交互式编辑界面如下：

```shell
pick f7233cf commit3
pick 77b14bc commit4

# Rebase 61a55fb..77b14bc onto 61a55fb (2 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
```

可以看到 commit2 本身并不在其中，这验证了前面提到的左开右闭区间的特点。

上面注释中有各种操作的说明，比如

```shell
p, pick <commit> = use commit
...
s, squash <commit> = use commit, but meld into previous commit
```

这里选几个操作说明。

```shell
pick     # 使用 commit
reword   # 使用 commit，修改该 commit 的 message
edit     # 使用 commit，并修改该 commit 的内容（不仅仅是 commit message）
squash   # 将该 commit 和前一个 commit 合并
fixup    # 类似于 squash，但不保留 commit message
exec     # 执行 shell 命令
drop     # 丢弃该 commit
```

为了合并 commit，编辑效果如下：

```shell
pick f7233cf commit3
squash 77b14bc commit4
```

保存后会提示编辑合并后的 commit message。

```shell
# This is a combination of 2 commits.
# This is the 1st commit message:

commit3

# This is the commit message #2:

commit4

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Sun May 15 20:32:00 2022 +0800
#
# interactive rebase in progress; onto 61a55fb
# Last commands done (2 commands done):
#    pick f7233cf commit3
#    squash 77b14bc commit4
# No commands remaining.
# You are currently rebasing branch 'master' on '61a55fb'.
#
# Changes to be committed:
#       new file:   file3
#       new file:   file5
```

输入 “combine commit” 后保存即可完成 rebase。rebase 后的提交历史：

```shell
$ git log --oneline
8de4399 (HEAD -> master) combine commit
61a55fb commit2
4af1183 commit1
```

由于 git 历史记录被更改，因此通常的 `git push origin` **不起**作用。 此时需要“强制推送”：

```shell
# Don't override changes
$ git push origin main --force-with-lease

# Override changes
$ git push origin main --force
```

强制推送具有严重的影响，因为它会更改分支提交的历史顺序。 请谨慎使用，尤其是多人协作时。

## 凭证系统( credentials system )

在 clone 仓库时，如果使用的是 https 协议，则每次 push 或 pull 都需要输入账户密码。

git 默认是不缓存用户名密码的，需要一些配置。

```shell
$ git config --global credential.helper         # 查看当前缓存模式
$ git config --global credential.helper [mode]  # 设置缓存模式
$ git config --global --unset credential.helper # 移除缓存模式
```

### git 内置凭证：cache 和 store

git 提供了两种模式：`cache` 和 `store`。

```shell
$ git config --global credential.helper cache
```

`cache` 模式下，git 会把登录信息保存在机器**内存**中一段时间，时间过后将被从内存中移除。一般是15分钟，可以添加参数自定义过期时间，比如 `--timeout 30000`。

```shell
$ git config --global credential.helper store
```

`store` 模式下，git 会把登录信息保留在**硬盘**中，且**没有失效时间**，除非修改密码或主动取消该模式。

该模式存在安全问题，**密码信息是用明文保存的**。

```shell
$ cat ~/.git-credentials 
https://username:ghp_Wkl.....xxxx@github.com
```

### 其他凭证系统

#### oxskeychain 模式( mac )

此模式下会将登录凭证加密处理并存储在 mac 的 osxkeychain 中。可以用 Keychain Access 查看。

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h287whfschj217u0u00vv.jpg)

也可以通过命令删除凭据：

```shell
$ git credential-osxkeychain erase
host=github.com
protocol=https
> [Press Return]
```

#### wincred 模式( windows )

该模式会将凭证信息加密处理放入到 windows 凭据管理器中。

#### manager 模式( windows )

 `manager` 模式需要安装名为 `Git Credential Manager for Windows` 的 [Git凭证助手程序](https://github.com/Microsoft/Git-Credential-Manager-for-Windows.)。该模式与 `osxkeychain` 模式类似，都会对凭证信息加密处理。

#### GCM 凭证助手( 推荐 )

GCM 是微软开发的凭证助手 `Git Credential Manager Core` 的简称。

安装命令：

```shell
$ brew install --cask git-credential-manager-core
```

对于 mac，不需要运行 `git config`，GCM 会自动配置 git。

首次验证成功后，凭据会存储在 mac 的 osxkeychain 中，每次克隆 HTTPS URL 时都会使用。 Git 不会要求在命令行中再次键入凭据，除非更改凭据。

### store模式，修改密码后如何处理？

store 模式下，凭证被存储到本地硬盘中。修改密码后，本地还存储着旧的凭证，导致仓库权限认证失败。

输入命令移除凭证：

```shell
$ git config --global --unset credential.helper
```

需要注意的是，这条命令不会把已缓存的凭证删除，因此需要手动删除旧凭证。

windows 保存在 `C:\Users\xxx\.git-credentials`，linux 为 `~/.git-credentials`。

删除后，重新设置 store 模式，然后执行 pull /push 操作会提示输入凭证，输入新密码就可以了。

### 小结

|         登录凭证存储         | linux |       mac        |        windows        |
| :--------------------------: | :---: | :--------------: | :-------------------: |
|       内存中，短期失效       | cache |      cache       |         cache         |
|     硬盘，明文存储，永久     | store |      store       |         store         |
| 硬盘，加密存储，永久（推荐） |  GCM  | osxkeychain、GCM | wincred、manager、GCM |

## 几个技巧

### 修改最后一次 commit

```shell
$ git commit --amend -m "new message"
```

以上命令可以将本次提交覆盖上一次提交。

使用场景有两个，比如上一次提交有个小错误，修复后没必要提交一个新的 commit，又或者想修改上一个 commit message，都可以用 `--amend` 修正。

需要注意的是，既然是覆盖上一个 commit，如果覆盖前的历史已经 push 到远端，在多人协作开发的情况下，可能会造成严重的冲突，此时不宜使用。

### 修复 bug

如果开发过程中，暂存区和工作区都有未 commit 的修改，此时需要切换到另一个分支修复 bug。为保存这些还未完成的工作，有两个做法：

* 临时 commit 一次，以后再用 `git commit --amend` 修正
* 用 `git stash` 将工作现场保存下来

需要注意的是，`git stash` 不会保存工作区的修改，因此需要先执行 `git add .` 将所有内容保存到 stage。

```shell
$ git add .
$ git stash # 保存工作现场
Saved working directory and index state WIP on master: e8d5a34 commit1
$ git stash list # 查看已保存的工作现场
stash@{0}: WIP on master: e8d5a34 commit1
```

可以看到生成了一条 stash 记录，`git stash` 可以执行多次，以栈的方式存储起来。

此时可以切换到其他分支进行工作，完成之后再恢复状态。

```shell
$ git stash apply # 恢复但不删除
$ git stash pop   # 恢复并删除
Dropped refs/stash@{0} (a22b6c9e3b56ee789b89b5f307c3e63408e0d723)
```

#### cherry-pick

假设你在 master 分支修复了 bug，并回到当前 dev 分支，很明显 dev 分支还有没修复这个 bug。

为此，可以执行：

```shell
$ git cherry-pick <commit-id>
```

将 master 分支上修复 bug 的 commit 在当前分支重做一次，并进行一次新的提交。注意这两个commit只是改动相同，但它们是两个不同的commit。

### 别名

```shell
$ git config --global alias.<alias-name> <git-command>
```

以上命令可以为一个命令起一个简短的别名，比如：

```shell
$ git config --global alias.glog log --graph --oneline
```

此时以下两个命令是等效的。

```shell
$ git glog
$ git log --graph --oneline
```

`--global` 表示对当前用户起作用，不加则只针对当前仓库。

别名配置可以在 `~/.gitconfig` 中查看，配置别名也可以直接编辑这个文件。

```shell
$ cat ~/.gitconfig
[user]
	name = xxx
	email = xxx@gmail.com
[core]
	quotepath = false
[credential]
	helper = cache
[alias]
  glog = log --graph --oneline
```

### 快速 clone 大仓库

一些项目经过长时间的持续开发，积累了很长的历史记录，clone 这样一个 repo 需要消耗相当长时间。

如果我们不关心具体的提交历史，只关心最新提交的代码，以 chromium 为例：

```shell
$ git clone https://github.com/chromium/chromium.git --depth=1
```

这样 clone 完成后，仓库中只包含了最后一次 commit 的信息，下载速度和仓库体积都大幅减小。

如果需要下载某个 tag，先在本地创建一个 repo：

```shell
$ git init chromium
$ git remote add origin https://github.com/chromium/chromium.git
```

然后执行：

```shell
# 下载特定 tag 的最后一次 commit
$ git -c protocol.version=2 fetch origin 104.0.5061.0 --depth=1
$ git checkout FETCH_HEAD # checkout 到这个 tag
```

## 参考

[GitHub Docs](https://docs.github.com/cn/get-started/getting-started-with-git)

[git自动保存账号密码](https://www.panyanbin.com/article/7a09727c.html)

[git 教程](https://www.liaoxuefeng.com/wiki/896043488029600)

[常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

