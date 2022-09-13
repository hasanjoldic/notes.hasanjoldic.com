---
title: "Unit Testing, Principles, Practices, and Patterns - Vladimir Khorikov"
date: "2022-08-26"
urls:
  - https://enki.fra1.digitaloceanspaces.com/Unit%20Testing,%20Principles,%20Practices,%20and%20Patterns%20-%20Vladimir%20Khorikov.pdf
---

# Unit Testing, Principles, Practices, and Patterns - Vladimir Khorikov

## Chapter 1 - The goal of unit testing

#### The relationship between unit testing and code design

The ability to unit test a piece of code is a nice litmus test, but it only works in one direction. It’s a good negative indicator—it points out poor-quality code. **If you find that code is hard to unit test, it’s a strong sign that the code needs improvement.** The poor quality usually manifests itself in tight coupling.

What is the goal of unit testing, then? **The goal is to enable _sustainable_ growth of the software project.** The term _sustainable_ is key. It’s quite easy to grow a project, especially when you start from scratch. It’s much harder to sustain this growth over time.

### Code coverage metrics

#### Code coverage

The first and most-used coverage metric is **code coverage**, also known as **test coverage**. This metric shows the ratio of the number of code lines executed by at least one test and the total number of lines in the production code base.

                                  Lines of code executed

Code coverage (test coverage) = --------------------------
Total number of lines

#### Branch coverage

Instead of using the raw number of code lines, this metric focuses on control structures, such as `if` and `switch` statements. It shows how many of such control structures are traversed by at least one test in the suite

                        Branches traversed

Branch coverage = ------------------------------
Total number of branches

```c#
public static bool IsStringLong(string input)
{
    return input.Length > 5;
}
public void Test()
{
    bool result = IsStringLong("abc");
    Assert.Equal(false, result);
}
```

There are two branches in the `IsStringLong` method: one for the situation when the length of the string argument is greater than five characters, and the other one when it’s not. The test covers only one of these branches, so the branch coverage metric is 1/2 = 0.5 = 50%.

`assertion-free testing` is when you write tests that don’t have any assertion statements in them whatsoever:

```c#
public void Test()
{
    bool result1 = IsStringLong("abc");
    bool result2 = IsStringLong("abcdef");
}
```

This test has both code and branch coverage metrics showing 100%. But at the same time, it is completely useless because it doesn’t verify anything.

> Think of a patient in a hospital. Their high temperature might indicate a fever and is a helpful observation. But the hospital shouldn’t make the proper temperature of this patient a goal to target by any means necessary. Otherwise, the hospital might end up with the quick and “efficient” solution of installing an air conditioner next to the patient and regulating their temperature by adjusting the amount of cold air flowing onto their skin. Of course, this approach doesn’t make any sense.

**It’s good to have a high level of coverage in core parts of your system. It’s bad to make this high level a requirement.**

Coverage metrics are a good negative indicator, but a bad positive one. Low coverage numbers—say, below 60%—are a certain sign of trouble. They mean there’s a lot of untested code in your code base. But high numbers don’t mean anything.

What makes a test suite successful as a whole?

- It’s integrated into the **development cycle**.

The only point in having automated tests is if you constantly use them. All tests should be integrated into the development cycle. **Ideally, you should execute them on every code change, even the smallest one.**

- It targets only the **most important parts** of your code base.

Testing business logic gives you the best return on your time investment.

- It provides **maximum value** with **minimum maintenance** costs.

# Chapter 2 - What is a unit test?

A unit test is an automated test that:

- Verifies a small piece of code (also known as a unit),
- Does it quickly,
- And does it in an isolated manner.

> #### Shared, private, and out-of-process dependencies
>
> A **shared** dependency is a dependency that is **shared** between tests and provides means for those tests to affect each other’s outcome. A typical example of **shared** dependencies is a static mutable field. A change to such a field is visible across all unit tests running within the same process. A database is another typical example of a **shared** dependency.
> A **private** dependency is a dependency that is not **shared**.
> An **out-of-process** dependency is a dependency that runs outside the application’s execution process; it’s a proxy to data that is not yet in the memory. An **out-of-process** dependency corresponds to a **shared** dependency in the vast majority of cases, but not always. For example, a database is both **out-of-process** and **shared**. But if you launch that database in a Docker container before each test run, that would make this dependency **out-of-process** but not **shared**, since tests no longer work with the same instance of it. Similarly, a read-only database is also **out-of-process** but not **shared**, even if it’s reused by tests. Tests can’t mutate data in such a database and thus can’t affect each other’s outcome.

## Chapter 3 - The anatomy of a unit test
