# How to become a maintainer on big projects

以下所有都是来自 Dan 的 twitter，具体可以查看[此线程](https://twitter.com/dan_abramov/status/1463718359262973953), 翻译部分来自谷歌翻译。

How do open source maintainers pick which contributors to “invest” in (time, effort, mentorship, etc)? I don’t know about others but for me the main thing isn’t coding skill. The main thing I’m looking for in a contributor is good judgement. This concept may sound fuzzy… Thread

> 开源维护者如何选择“投资”哪些贡献者（时间、精力、指导等）？我不了解其他人，但对我来说，最主要的不是编码技能。我在贡献者中寻找的主要内容是**良好的判断力**。这个概念可能听起来很模糊……

First, what good judgement is NOT. It has nothing to do with where you’re from, how you present yourself, how old you are, or even how many years of professional experience you have.

> 首先，什么是或不是好的判断。这与您来自哪里、您如何展示自己、您的年龄甚至您拥有多少年的专业经验无关。

Good judgement also has nothing to do with the “clout” or being known. There are people with 5 followers whose judgment I would trust more than well-known characters with latge audiences.

> 良好的判断力也与“影响力”或知名度无关。有些人有 5 个追随者，他们的判断比拥有大量观众的知名角色更让我相信。

So what do I mean by “good judgment”? I can’t give a precise definition but I’ll describe what working with a person like this feels like.

> 那么我所说的“良好的判断力”是什么意思？我无法给出准确的定义，但我会描述与这样的人一起工作的感觉。

Reading their PR descriptions is a treat. They use the right amount of detail — not paraphrasing the code but enough to explain what they’re doing, how, and most importantly, why. They mention their thought process — why this approach, alternatives rejected, how they tested.

> 阅读他们的 PR 描述是一种享受。他们使用了适量的细节——不是解释代码，而是足以解释他们在做什么，如何做，最重要的是，为什么。他们提到了他们的思考过程——为什么是这种方法，替代方案被拒绝，他们如何测试。

They look at a bigger picture. For example, if there is a crash, they don’t just add != null check on the line that crashes. They look at _why_ that thing is null, whether it’s supposed to ever be null or not, where the assumptions were violated, and what’s a good place to fix.

> 他们着眼于更大的图景。例如，如果发生崩溃，他们不只是在崩溃的行上添加 != null 检查。他们着眼于*为什么*那个东西是空的，它是否应该是空的，假设出问题的地方，以及修复的好地方。

They don’t look at code as a static “here’s what the computer runs” level. They see a living body of work. They try to figure out the past intentions (of the people who wrote it), track the history of changes (where was a mistake introduced?), leave breadcrumbs for next readers.

> 他们不会将代码视为静态的“这就是计算机运行的内容”级别。他们看到了活生生的工作。他们试图弄清楚（编写它的人的）过去的意图，跟踪变化的历史（哪里引入了错误？），为下一个读者留下线索和提示，让读者了解你的故事。

They look at the result end-to-end. If they fix a bug, they don’t rely on “tests pass” as the only signal. They put it in a project that reproduces the bug, and verify that the bug is gone. (Here’s a secret: if you don’t do this, the maintainer says thanks but does it for you.)

> 他们端到端地查看结果。如果他们修复了一个错误，他们不会将“测试通过”作为唯一的信号。他们将其放入重现该错误的项目中，并验证该错误是否已消失。 （这是一个秘密：如果你不这样做，维护者会说谢谢，但会为你做。）

They maintain quality. They put in equal amount of work in verifying their change is right and works as intended as into the change itself. It’s noticeable they CARE. They act as a merciless QA for their own work — not shying away from spending hours on meaningful testing.

> 他们保持质量。他们投入了等量的工作来验证他们的更改是否正确，并且在更改本身中按预期工作。很明显他们很关心。他们为自己的工作充当无情的 QA - 不回避花费数小时进行有意义的测试。

When I see “I tested on three resolutions in three browsers and went through scenarios X, Y and Z” (or equivalent that makes sense for the project) my heart fills with joy. This person knows I’ll have to do this anyway and they’ve shown the courtesy of doing it first. Thanks.

> 当我看到“我在三个浏览器中测试了三个分辨率并经历了场景 X、Y 和 Z”（或对项目有意义的等效项）时，我的心充满了喜悦。这个人知道无论如何我都必须这样做，而且他们已经表现出了先做这件事的礼貌。谢谢。

This doesn’t mean they can’t screw up. All of us can! But they take enough diligence that the mistakes feel earned. There’s a difference between something slipping through and literally not bothering to chrck whether the change does the thing. Be your own QA and I’ll trust you.

> 这并不意味着他们不能搞砸。我们都可以！但他们足够勤奋，以至于这些错误都是自己赚来的。一些东西漏掉了和字面上不费心去检查变化是否会起作用之间是有区别的。做你自己的 QA，我会相信你。

This might sound ungrateful, but in many cases the maintainer helping _you_ — to land a commit in a popular project, to have a good contributing experience, etc. Often, they can do an equivalent change fast but they want it to be yours and spend days on back-and-forth.

> 这听起来可能有些忘恩负义，但在许多情况下，维护者会帮助 _你_——在一个受欢迎的项目中提交一个 commit，获得良好的贡献经验等。通常，他们可以快速进行等效的更改，但他们希望它是你的并花几天的时间来回。

They are very perceptibe to the context. Beyond following the guidelines, they try their best to infer the things that may not be directly visible — assumptions, project aspirations, quality bar, tech debt areas, frustrating workflows, intentionally cut corners, style, vibes.

> 他们对上下文非常敏感。除了遵循指导方针之外，他们还尽力推断出可能无法直接看到的事物——假设、项目愿望、质量标准、技术债务领域、令人沮丧的工作流程、故意偷工减料、风格、共鸣。

They see the end result as a holistic product. They look at their change in the context of the goals of the project, other people’s issues, other solutions. They act as if they are responsible for the whole thing—even if at the moment they only change a small part.

> 他们将最终结果视为一个整体产品。他们在项目目标、其他人的问题和其他解决方案的背景下看待他们的变化。他们表现得好像他们要对整件事负责——即使此刻他们只改变了一小部分。

Responsibility is central to this. Most contributions—while great—need maintainers to add more responsibility to their plates. Test this change, figure out how this code worked before, research browser differences, etc. But there are some contributors who _take_ responsibility.

> 责任是这方面的核心。大多数贡献——虽然伟大——需要维护者为他们的板块增加更多的责任。测试此更改，弄清楚此代码以前如何工作，研究浏览器差异等。但有些贡献者*承担*责任。

They look for opportunities and propose meaningful changes. Changes that are scoped, pragmatic, usually incremental. Their changes “feel” more like “carving out” what should be “already there” rather than attaching something extra. They make the $PROJECT feel more $PROJECT-y.

> 他们寻找机会并提出有意义的改变。范围内的、务实的、通常是增量的变化。他们的变化“感觉”更像是“雕刻出”应该“已经存在”的东西，而不是附加一些额外的东西。它们让 $PROJECT 感觉更像 $PROJECT-y。

There is no ego in their work. It’s clear they’re not _just_ sending it to build up a resume. Their priority is to land the right change for the project (and figure out what it is!) rather than to land their exact idea. They might send _simple_ changes but not spammy ones.

> 他们的工作中没有自我。很明显，他们不*只是*发送它来建立简历。他们的首要任务是为项目找到正确的变更（并弄清楚它是什么！），而不是确定他们的确切想法。他们可能会发送*简单的*更改，但不会发送垃圾邮件。

So far I’ve focused on the code (although the same applies to documentation too). However, they are usually active beyond that. In fact, I usually see these people start _outside_ code: helping people in issues, testing other PRs, making reproducing cases for bug reports.

> 到目前为止，我一直专注于代码（尽管这同样适用于文档）。但是，除此之外，它们通常还很活跃。事实上，我经常看到这些人从*外部*代码开始：帮助人们解决问题，测试其他 PR，为错误报告制作重现案例。

This makes sense because for established projects, many valuable activities _are_ external to code. There’s nothing wrong with wanting to score a PR, but it’s noticeable when a person has a more community/product-driven mindset, and takes some routine work off maintainers’ plate.

> 这是有道理的，因为对于已建立的项目，许多有价值的活动*是*代码外部的。想要获得 PR 并没有错，但是当一个人有更多社区/产品驱动的心态，并且从维护人员的盘子里拿走一些日常工作时，这一点就很明显了。

They show an interesting balance of cultivating a vision for the parts they’re interested in while staying genuinely curious and protective of the project’s oberall existing vision.

> 他们表现出一种有趣的平衡，即为他们感兴趣的部分培养愿景，同时保持真正的好奇心并保护项目的整体现有愿景。

How does one learn this? I don’t know. I’ve seen people fresh out of bootcamp who excel at this and I’ve also seen people with 10+ years of experience who don’t. Empathy helps. If you can imagine what it’s like to be in maintainer’s shoes, you’ll soon be ready to be a maintainer.

> 这个怎么学？我不知道。我见过刚从训练营毕业的人在这方面表现出色，我也见过有 10 年以上经验的人不擅长。**同理心有帮助**。如果您能想象成为维护者的感觉，那么您很快就会做好成为维护者的准备。

I should clarify that there’s nothing wrong about simple drive-by PRs that do none of those things. (I send quite a few of those myself!) My thread is about how to stand out — these are the qualities I’ve observed in people who get invited to co-maintain in different projects.

> 我应该澄清一下，简单的驱动式 PR 没有做这些事情的任何问题。 （我自己发送了很多！）我的主题是**关于如何脱颖而出**——这些是我在被邀请参与不同项目的人身上观察到的品质。

At the end of the day, it’s open source. Reading this might make you think: “wtf, all this work and for free?” That’s fair. I wouldn’t expect any developer to _want_ to do all of this. Some might want to but not have the time to do so much extra work either.

> 归根结底，它是开源的。读到这里你可能会想：“wtf，所有这些工作都是免费的？”这还算公平。我不希望任何开发人员*想要*做这一切。有些人可能想要但也没有时间做这么多额外的工作。

Still, the average bar is low enough that by putting in slightly more effort you can already stand out. Also, maybe don’t start with PRs to huge projects — often maintainers don’t have time at all. Smaller projects often have more actionable things to fix and faster review times.

> 尽管如此，平均标准仍然足够低，通过稍微多加努力，您已经可以脱颖而出。此外，也许不要从大型项目的 PR 开始——通常维护人员根本没有时间。较小的项目通常有更多可操作的问题需要解决，审查时间也更快。

Also, this isn’t to say that as a maintainer you should only help people who are already great at this. It’s a pleasure to help someone who is struggling to grow their skillset — when time allows. What I described is more about how people earn trust on projects in longterm.

> 此外，这并不是说作为维护者，你应该只帮助那些已经在这方面做得很好的人。很高兴在时间允许的情况下帮助那些正在努力提高技能的人。我所描述的更多是关于**人们如何长期获得对项目的信任**。

I do want to emphasize though that none of this is about the _volume_ of the work. (If anything, larger PRs are very rarely hitting that quality bar!) It’s about thoughtfulness and care noticeable in the approach. Even for small things.

> 我确实想强调，这一切都与工作的*数量*无关。 （如果有的话，较大的 PR 很少达到那个质量标准！）这是关于在方法中值得注意的体贴和关怀。即使是小事。
