---
title: "User story mapping"
date: "2023-01-07"
urls:
  - https://enki.fra1.digitaloceanspaces.com/books/User%20Story%20Mapping.pdf
---

# User story mapping

When talking about quality, I start with discussions of these three aspects:

- User experience quality
  Review the work from the perspective of its target user. Is it straightforward to use? Is it fun to use? Does it look good? Is it consistent with your brand and other functionality?

- Functional quality
  Does the software do what you agreed it would without bugs or errors? Testers and other team members have hopefully spent time testing and you’ve fixed any bugs already. But good testers can often tell you that there are likely more bugs lurking in your prod‐ uct that may emerge later. Or hopefully they can say that it feels rock solid.
- Code quality
  Is the software we wrote high quality? Consistent with our stand‐ ards? We may own this stuff for a while, so it’d be good to know if we think it’ll be easy to extend and maintain, or if we’ve just added a pile of technical debt we’ll need to address later.

---

One of the luminaries in the Agile development community is my aforementioned friend, Alistair Cockburn, who once told me, "For every story you write, you need to put three into your backlog of stories."
I asked him why, and he said, "You just do."
I asked, "What should I write on the other two?"
"It doesn’t matter what you write."
"What do you mean?" I asked, "I have to write something on them!"
Alistair replied, "Well, if you have to write something on them, then write what you want on the first card, and on the second card write ‘Fix the first card.' Then on the third card, write ‘Fix the second one.' If you aren’t going around this cycle three times for each story, you’re not learning."
In a traditional process, learning gets referred to as scope creep or bad requirements. In an Agile process, learning is the purpose. You’ll need to plan on learning from everything you build. And you’ll need to plan on being wrong a fair bit of the time.

---

One of the silly mantras that comes from my friend Luke Hohman is that you can deliver "half a baked cake, not a half-baked cake." Half a baked cake may not be enough to feed a wedding party, but it’s enough to taste and leave everyone looking forward to the rest of the cake.

---

Remember, there are always more ideas for things to build than we’ll have time for. Find the opportunities aligned with your organization’s business strategy and that solve problems for customers and users that are compelling. Have enough discussions to make a go/no-go decision.

"Go" doesn’t mean "We’re gonna build this thing," it means we’ll move the opportunity forward into deeper discovery discussion.

---

Remember, our goal is to minimize the amount we build (our output) and maximize the benefit we get from doing it (the outcomes and impact). Your opportunity will break into lots of possible smaller sto‐ ries. We certainly wouldn’t build them all. That wouldn’t be minimiz‐ ing output, would it?

---

### Frame the idea

Use these discussions to review why your business is building the software, who it’s for, and how you’ll measure success.

- Named business problems you're addressing
- Specific business metrics affected
- Short lists of specific customers and users
- Metrics that will allow us to measure whether people use
and like this new feature
- Big risks and assumptions
- Discussions with business stakeholders and subject matter experts

### Understand customers and users

Use discussions and research to understand customers and users, their needs, and how they work today.

- Lists of user roles and descriptions
- Simple user profiles or person sketches
- Simple organizational profiles or orgzonas
- Story maps about how people do things today—also
known as journey maps
- User research and observation to fill in what we don't know


### Envision solutions

Focus on specific customers and users, and then envision solutions that will help them. Visualize solutions with words and pictures. Validate those solutions with customers and users.

- Story maps
- Use cases and user scenarios
- UI sketches and storyboards
- UI prototypes
- Architectural and technical design sketches
- Architectural or technical prototypes
- Lots of collaboration with team members, users, customers, stakeholders, and subject matter experts

### Minimize and plan

Identify what you believe is a small, viable solution. Estimate well enough to set a budget for delivering the solution. Create a plan for development that will minimize risk.

- Story maps used for slicing
- Estimation used for setting a development budget

---

Here are a few great ways to mess up a design process:
- Start without framing the business needs and target customer well. This’ll make it hard to prioritize who to focus on, and hard to tell if you’re finding a good solution.
- Spend a lot of time doing thorough research and making sense of what you’ve learned. You’ll never run out of things to learn—so why stop? Time-boxing might have been a good idea.
- Don’t spend any time at all talking to people and learning from them. After all, we’ve got a lot of data, and really, our solution ideas are great. We just need to get going on designing them.
- Fail to focus on specific problem, and instead try to solve lots of problems for lots of people. The more problems you solve the better, right? Except that big problems often result in big solutions.
And trying to solve a problem for people with conflicting needs can result in a solution neither person likes.
- Consider multiple solutions, but only ask real designers to con‐ tribute solution ideas, because they’re the only ones trained to have good ideas.
- Don’t waste time considering multiple solutions, because the idea we have is so good.
- Beautifully craft a prototype that really looks real, but doesn’t work well enough for customers and users to really use it. After all, when they see it, they tell us it "looks really lovely."
- Convince yourself and then others that this well-researched, pro‐ fessionally designed solution will work. After all, you’ve followed a rigorous design process. What could go wrong?
- Don’t worry about how much it’ll cost to build. It’s the right sol‐ ution, and any cost to build it is justified.
- When you deliver the solution to customers and users, and don’t see the outcomes you expect, find the breakdown in the process that’s at fault. Or better yet, find a person or group you can blame.

---

Story Workshop Recipe
Use a story workshop to refine understanding and define specifically what the development team will build. The workshop is a product conversation—supported by lots of pictures and data—that helps the team make decisions and arrive at confirmation: the acceptance cri‐ teria for what we’ll choose to build.
Ahead of the workshop, let the team know what stories you’ll be work‐ shopping. Post it on a wall, or otherwise broadcast it. Let team mem‐ bers opt in; that is, choose to participate or not.
Keep the workshop small to stay productive. Three to five people is a good size.
Include the right people. For this conversation to be effective, include:
• Someone who understands users and how the user interface could or should work—often a product owner, user experience professional, or business analyst
• One or two developers who understand the codebase you’ll be adding the software into, because they’ll best understand what’s feasible to build
• A tester who’ll help test the product—because he’ll help ask the tough questions so that we consider the "what abouts" that others are often too optimistic to consider
Other people and roles may be relevant here, but remember that the right size for a good conversation is "dinner conversation–sized."
You may find that one person can wear two hats. For example, I often see a combination business analyst-tester in some IT organizations. But, if all the concerns aren’t considered, pause the workshop and try to find someone from the team who can look after the missing concern.
Dive deep and consider options. Use the conversations to dive deep into:
• • • •
Exactly who the user is
Exactly how we believe she would use it
Exactly what it looks like—that is, the user interface
Exactly how the software behaves underneath that user interface —those sticky business rules and data validation stuff
• Roughly how we might build the software—because we need to predict how long it will take to build—and happily, we’re making things real enough at this point we can more accurately predict how long that will take
Remember that we need not consider anything absolutely required. If the discussion leads to solutions that are expensive or complex, step back and discuss the problems we’re really solving, and other alter‐ natives we could build to solve them.
Agree on what to build. After enough conversation to build shared understanding, move to answering the questions:
• What will we check to confirm this software is done?
• How will we demonstrate this software later when we review it together?
Talk and doc. Use whiteboards or flipchart paper to draw pictures, write examples, and consider options. Don’t let your decisions va‐ porize. Record them on a whiteboard or flipchart where everyone can see. Photograph notes and drawings and then transcribe them later.
Speak in examples. Wherever possible, use specific examples of what users do, exactly what data might be entered, exactly what users would see in response, or whatever examples best support your story.
Split and thin. When discussing details and thinking about develop‐ ment time, you’ll often find stories are larger than you like to put in a development cycle. Work together as a group to split up big stories, or "thin" out stories by removing unnecessary extras.
It’s not working when...
• No one participates—when one person describes what’s required and everyone else listens
• When we focus only on acceptance criteria and not telling the story about who does what and why
• When we fail to consider options both from a functional and technical perspective
 
---

Bundle Small Stories to Clean Up Your Backlog
I often run into product teams that have backlogs with hundreds of items in them. And, predictably, they tell me that they struggle to prioritize their backlogs. When I look into their backlogs, they’re often filled with lots of little stories. Talking about each one of them to make a prioritization decision would take hours, or days in some cases. So don’t.
If this were Asteroids, you’d have lost. But since it’s not, try bundling up your small stories into bigger stories:
1.
2.
3. 4.
5. 6.
7.
8.
If your stories are in an electronic backlog, get them out onto cards or sticky notes. Whatever tool you’re using should be able to print or export to a spreadsheet. I’ll use a simple mail merge in a word processing program to create labels for all the stories and then stick them to a card, or print directly onto cards.
Ask for help from a group of team members who understand the system. Schedule a room with lots of wall or table space where you can work.
Give everyone a handful of story cards and ask them to start placing them on the tabletop or sticking them to the wall.
When you see a card that seems similar to one you’re placing, cluster them together. Don’t think too hard about what "similar" means—just go with your gut.
Do this organizing in silence, at least to start. You’ll find that it’s the conversation that slows things down. And it’s good to learn to use the model and your body language to communicate.
Move and reorganize any card you want. It’s everyone’s model, so that means no one owns the position of a card. If something looks out of place, move it. If someone disagrees, he or she will move it back. That’s your cue to discuss why.
After things settle into clusters, take a different color card or sticky and make a header for each cluster. On that card, write a better story name—one that distills why all these cards are sim‐ ilar. If you’ve written a distillation called "UI improvements," that may be too vague. "Improve entering and editing comments" would be better, assuming those UI changes were about comments.
The distillations become your new, bigger stories. The other cards become bullet points in its description. Add those
distillations back into your release backlog. Or, if they’re defer‐ rable, move them all the way back to your opportunity backlog.
This works fantastically well for deep backlogs composed of lots of little items. It’s wonderful for deep bug lists, too. You know how there are always lots of lower-priority bugs that never get fixed? Bundle them with other higher-priority bugs in the same area of the system. When a developer goes in to fix the high-priority bugs, it’s often trivial to hit the low-priority bugs, too. Your customers and users will thank you for it.

---

