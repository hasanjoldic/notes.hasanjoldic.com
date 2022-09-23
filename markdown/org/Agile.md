---
title: "Agile"
date: "2022-09-22"
---

# Thoughts on agile

<br />

<details>

  <summary>Manifesto for Agile Software Development</summary>

[principles](https://agilemanifesto.org/principles.html)

[history](https://agilemanifesto.org/history.html)

<div align="center">

<br />

**Individuals and interactions** over processes and tools

**Working software** over comprehensive documentation

**Customer collaboration** over contract negotiation

**Responding to change** over following a plan

<br />

</div>

<hr />

<br />
<br />

- **Our highest priority is to satisfy the customer through early and continuous delivery of valuable software.**

- **Welcome changing requirements, even late in development. Agile processes harness change for the customer's competitive advantage.**

- Deliver working software frequently, from a couple of weeks to a couple of months, with a preference to the shorter timescale.

- Business people and developers must work together daily throughout the project.

- **Build projects around motivated individuals. Give them the environment and support they need, and trust them to get the job done.**

- The most efficient and effective method of conveying information to and within a development team is face-to-face conversation.

- **Working software is the primary measure of progress.**

- Agile processes promote sustainable development. The sponsors, developers, and users should be able to maintain a constant pace indefinitely.

- Continuous attention to technical excellence and good design enhances agility.

- Simplicity - the art of maximizing the amount of work not done - is essential.

- **The best architectures, requirements, and designs emerge from self-organizing teams.**

- At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behavior accordingly.

<hr />

</details>

Working in an agile way, in essence, means being adaptable to changes and not being rigid.

When we're developing a product we need to be able to do the following things:

1. **Planning a release** - We must know if we can finish a feature in time if we have a deadline. There are times when we don't have deadlines (when we already have a good product and we're giving our users more and more features with each iteration), but even then, we will have multiple options to choose from when deciding what feature to implement. All other things being equal, those features that are quickest to implement should be prioritized.

   One other very important thing, is that we need to combine our product planning with our burn rate. Or, in general, with our revenue and expenses. And, in that sense, it is very important to know whether a certain feature will be finished in time if we are relying on it to generate critical revenue for the company.

2. **Tracking performance** - We must know if workers are performing above a certain standard. This is difficult even if we have the technical ability to judge their performance. But, even then, we have to invest time to learn about the technical details of the project. This gets more complicated the bigger the company gets and the more layers in the organization hierarchy there are. Becase, then, there needs to be somebody to track the performance of the people who track performance :)

<br />

The agile solution to the challenges above is to **trust** the people working on the project and to give them **freedom** to implement the solutions they think are the best.

If we choose that, then, we only have to solve one challenge instead of two. In that case, we only need to solve the problem of **how to hire the right people**. People, who have the required technical skills, and are also the people we can trust to take care of critical parts of the product with minimal or no supervision.

In general, testing for technical ability is done through interviews, which isn't straightforward. There are many, many books written about this subject. And, there are many contradictory opinions on how best to do that.

We can either have no good candidates (from a technical POV) or too many.

- if we have no good candidates, our options are:

  - expand our search
  - scale down our goals
  - give up on the project

  <br />

- if we have too many and we can't make a choice, my opinion is that we should make our decision based on who we think would be easiest to work with or by **random chance**. After a certain point, there is little to no value from additional interviews or tests. [link](https://rework.withgoogle.com/blog/google-rule-of-four/)

  What's more, not all candidates are going to invest their time in a protracted interview process.

<hr />

Even if we have an agile system in place, we still need to be able to track our progress.

There are two sides:

- estimating the time needed for a task before we start working on that task - is essentially just guesswork and should be just used as a general guideline.
  We still need to have that guideline, and the best way (in my opinion) to do that is to follow these steps:

  1. Discuss the goals of the project. What can we implement that will bring us closer to our goal? Decide who the stakeholders are and discuss in detail with them. For example, if it's a backend issue, discuss with the backend team.

  2. Try to answer the question "Is is impossible to implement?". If we can, with certainty say that it is impossible, we stop here. Impossible can also mean that we have certain time or budget restrictions.

  3. If we think it's possible, next step is to give a rough estimate. This shouldn't be relied on and it should be based on past experiences or intuition. Most importantly, it should be given in good faith and without pressure.

  4. Do a small chunk of the work.

  5. Go to step 2. (With each iteration we will have more information to base our decisions upon)

- tracking progress of a task that we are already working on - we shoul use a project management took to keep track of the work, but it shouldn't be relied on for estimations about finishing the work. These are the general guidelines that I think are helpful:

  - have a task/issue/ticket hierarchy. At the bottom is the smallest unit of work that we track and it should take us no longer than a day to finish it.
    If we think that a "task" may take us more than a day we should divide it into multiple tasks.

  - we shouldn't do estimates on the tasks themselves. It doesn't matter if these are time or difficulty estimates. Giving no estimates on task level has shown to be no less accurate than having estimates. [link](https://www.methodsandtools.com/archive/noestimates.php)

  - group tasks into bigger units of work. Those are usually called **stories** and **epics**. Stories and epics also shouldn't have estimates and should only be used to organize tasks and to assign each group of tasks the correct priority.
