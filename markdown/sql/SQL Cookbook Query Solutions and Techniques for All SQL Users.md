---
title: "SQL Cookbook"
date: "2022-08-27"
urls:
  - https://enki.fra1.digitaloceanspaces.com/SQL%20Cookbook%20Query%20Solutions%20and%20Techniques%20for%20All%20SQL%20Users.pdf
---

# SQL Cookbook

## 1 - Retrieving Records

### 1.3 Finding Rows That Satisfy Multiple Conditions

```sql
SELECT *
FROM emp
WHERE deptno = 10
OR comm IS NOT NULL
OR sal <= 2000 AND deptno=20;
```

We can also add aranthessi:

```sql
SELECT *
FROM emp
WHERE (
  deptno = 10
  OR comm IS NOT NULL
  OR sal <= 2000
)
AND deptno=20;
```

### 1.5 Providing Meaningful Names for Columns

You would like to change the names of the columns that are returned by your query so they are more readable and understandable.
Consider this query that returns the salaries and commissions for each employee:

```sql
SELECT sal, comm
FROM emp;
```

What’s sal? Is it short for sale? Is it someone’s name? What’s comm? Is it communication? You want the results to have more meaningful labels.

```sql
SELECT
  sal AS salary,
  comm AS commission
FROM emp;
```

> Using the `AS` keyword to give new names to columns returned by your query is known as aliasing those columns. The new names that you give are known as aliases. Creating good aliases can go a long way toward making a query and its results understandable to others.

### 1.6 Referencing an Aliased Column in the WHERE Clause

#### Problem

You have used aliases to provide more meaningful column names for your result set and would like to exclude some of the rows using the `WHERE` clause. However, your attempt to reference alias names in the `WHERE` clause fails:

```sql
SELECT
  sal AS salary,
  comm AS commission
FROM emp
WHERE salary < 5000;
```

#### Solution

By wrapping your query as an inline view, you can reference the aliased columns:

```sql
SELECT *
FROM (
  SELECT
    sal AS salary,
    comm AS commission
  FROM emp
) x
WHERE salary < 5000;
```

Placing your query, the one giving aliases, in an inline view gives you the ability to reference the aliased columns in your outer query. Why do you need to do this? The `WHERE` clause is evaluated before the `SELECT`; thus, `salary` and `commission` do not yet exist when the query’s `WHERE` clause is evaluated. Those aliases are not applied until after the `WHERE` clause processing is complete. However, the `FROM` clause is evaluated before the `WHERE`. By placing the original query in a `FROM` clause, the results from that query are generated before the outermost `WHERE` clause, and your outermost `WHERE` clause "sees" the alias names.
The inline view in this solution is aliased `x`. Not all databases require an inline view to be explicitly aliased, but some do. **All of them accept it.**

### 1.7 Concatenating Column Values

```sql
SELECT ename||' WORKS AS A '||job AS msg
FROM emp
WHERE deptno = 10;
```

### 1.8 Using Conditional Logic in a SELECT Statement

```sql
SELECT ename, sal,
  CASE
    WHEN sal <= 2000 THEN 'UNDERPAID'
    WHEN sal >= 4000 THEN 'OVERPAID'
    ELSE 'OK'
  END as status
FROM emp;
```

### 1.9 Limiting the Number of Rows Returned

```sql
SELECT *
FROM emp
LIMIT 5;
```

### 1.10 Returning n Random Records from a Table

```sql
SELECT ename, job
FROM emp
ORDER BY random()
LIMIT 5;
```

### 1.11 Finding Null Values

```sql
SELECT *
FROM emp
WHERE comm IS NULL;
```

> `NULL` is never equal/not equal to anything, not even itself; therefore, you cannot use `=` or `!=` for testing whether a column is `NULL`. To determine whether a row has `NULL` values, you must use `IS NULL`. You can also use `IS NOT NULL` to find rows without a null in a given column.

### 1.12 Transforming Nulls into Real Values
