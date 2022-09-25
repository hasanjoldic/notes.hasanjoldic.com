---
title: "UI Libraries 2022"
date: "2022-09-24"
---

# Comparison of UI Libraries with React support in Sept. 2022

There is no shortage of UI Libraries in 2022.
The list doesn't get any shorter if we filter out the ones with no React support, as React is the most popular web frontend library.
However, here I will only consider a small subset of the available libraries.
I have included libraries with the following characteristics:

- stable and popular
- written in TypeScript
- good documentation
- responsive
- SSR support
- wide range of components
- small bundle size
- theming
- Figma support
- a11y support - optional
- i18n and l10n support - optional
- custom icons - optional

With these critieria in mind, the list consists of:

- [Material UI - Google](https://mui.com/)
- [Chakra UI - Independent](https://chakra-ui.com/)
- [Ant Design - Alibaba](https://ant.design/)
- [Carbon - IBM](https://carbondesignsystem.com/developing/frameworks/react)
- [Daisy UI - Independent](https://daisyui.com/)
- [Semantic UI - Independent](https://react.semantic-ui.com/)
- [React-Bootstrap - Independent](https://react-bootstrap.github.io/)
- [Blueprint - Palantir](https://blueprintjs.com/)
- [Mantine - Independent](https://mantine.dev/)

<hr />
<br />

|                                     | Material UI | Chakra UI | Ant Design | Carbon  | Daisy UI | Semantic UI | React-Bootstrap | Blueprint | Mantine |
| ----------------------------------- | ----------- | --------- | ---------- | ------- | -------- | ----------- | --------------- | --------- | ------- |
| excellent documentation             | yes         | yes       | no         | yes     | yes      | yes         | yes             | no        | yes     |
| very popular                        | yes         | yes       | yes        | no      | no       | no          | yes             | no        | no      |
| implements all necessary components | yes         | no        | yes        | yes     | no       | yes         | no              | yes       | yes     |
| easily customizible                 | yes         | yes       | no         | yes     | yes      | yes         | yes             | yes       | yes     |
| Figma support                       | yes         | yes       | yes        | yes     | yes      | yes         | yes             | yes       | yes     |
| a11y                                | yes         | yes       | no         | yes     | no       | no          | yes             | no        | yes     |
| i18n                                | yes         | no        | yes        | no      | yes      | no          | no              | no        | no      |
| l10n                                | yes         | no        | yes        | no      | no       | no          | no              | no        | no      |
| custom icons                        | yes         | yes       | yes        | yes     | no       | no          | yes             | yes       | no      |
| playful or serious design           | middle      | middle    | serious    | serious | playful  | middle      | middle          | serious   | middle  |

<br />

Based on the above table, the following libraries will be considered for further tests:

- Material UI
- Chakra UI
- ~~Ant Design~~
- ~~Carbon~~ peer dependency on react@17, not written in TS
- ~~Daisy UI~~ set up was difficult (maybe my fault)
- ~~Semantic UI~~ not popular, lacks features
- React-Bootstrap
- Blueprint
- Mantine

<hr />
<br />

The following table shows the bundle size of each library.
I have used **vite** as the build tool and I have used the default configuration.
After installing all packages and creating a build, the sizes were:

```
index.css   1.37 KiB    / gzip: 0.71 KiB
index.js    140.56 KiB  / gzip: 45.38 KiB
```

From each packages, I have added the following:

- Text Field
- Input Field
- Autocomplete/Search
- Button
- Date Picker
- Table
- Popup

All sizes are in **KiB** and they include the the size of the basic bundle of just **react** and **react-dom**.

|              | base | Material UI | Chakra UI | React-Bootstrap | Blueprint | Mantine |
| ------------ | ---- | ----------- | --------- | --------------- | --------- | ------- |
| js           | 141  | 452         | 456       | 247             | 940       | 367     |
| css          | 1    | 1           | 1         | 1               | 1         | 1       |
| total        | 142  | 453         | 457       | 248             | 941       | 368     |
| js (gzip)    | 45   | 141         | 150       | 80              | 292       | 109     |
| css (gzip)   | 1    | 1           | 1         | 1               | 1         | 1       |
| total (gzip) | 46   | 142         | 151       | 81              | 293       | 110     |

<br />

Notes:

- Material UI: Date field comes in a separate package and weighs ~230 KiB (with **date-fns**)
- Chakra UI: No Autocomplete/Search and Date Picker
- Chakra UI: Tree shaking could maybe be implemented. I didn't want to waste too much time trying to find out how.
- React-Bootstrap: No Date Picker
- React-Bootstrap: Autocomplete is in a separate package maintained by another team
- Mantine: approach to tree shaking is to divide the components into many packages and only add the ones that are necessary

Based on the above, only the following can be considered further:

- Material UI
- ~~Chakra UI~~
- ~~React-Bootstrap~~
- ~~Blueprint~~
- Mantine

<hr />

In the table bellow I am showing the time spent on different tasks in the browser.
Scripting and rendering time should be shorter, and idle time longer for a better score.

Tests run for 10 seconds and I am showing the relative times.

|                 | Material UI | Mantine  |
| --------------- | ----------- | -------- |
| (1) - scripting | 21 %        | 58 %     |
| (1) - rendering | 55 %        | 12 %     |
| (1) - painting  | 3 %         | 3 %      |
| (1) - system    | 11 %        | 6 %      |
| (1) - idle      | **10** %    | 21 %     |
| (1) - fps       | 55          | 55       |
| (2) - scripting | 35 %        | 15 %     |
| (2) - rendering | 9 %         | 3 %      |
| (2) - painting  | 0 %         | 0 %      |
| (2) - system    | 0 %         | 0 %      |
| (2) - idle      | 57 %        | **82** % |
| (2) - fps       | 52          | 40       |
| (3) - scripting | 11 %        | 14 %     |
| (3) - rendering | 10 %        | 10 %     |
| (3) - painting  | 5 %         | 3 %      |
| (3) - system    | 2 %         | 4 %      |
| (3) - idle      | 72 %        | 69 %     |
| (3) - fps       | 58          | 58       |
| (4) - scripting | 19 %        | 5 %      |
| (4) - rendering | 3 %         | 4 %      |
| (4) - painting  | 0 %         | 0 %      |
| (4) - system    | 0 %         | 0 %      |
| (4) - idle      | 88 %        | 91 %     |
| (4) - fps       | 58          | 58       |

<br />

(1) - 1000 Text Field components, rerendering individually at random intervals which are between 0 and 5000ms.

(2) - 1000 Text Field components, rerendering all at once every 2 seconds.

(3) - 200 Table components, rerendering same as Test (1).

(4) - 200 Table components, rerendering same as Test (2).

<br />

Material UI Pros:

- more popular
- better documentation
- I have used it before
- built-in l10n
- supports tree shaking

Mantine Pros:

- smaller bundle size
- no paid option
- foss and great community
- doesn't implement tree shaking, but separates components in different packages to keep bundle size smaller

<hr />
<br />

For a small startup with a dedicated designer, I would suggest the following approach:

- use a UI library instead of creating your own
- customize the theme
- create a design (in Figma, for example)
- implement the design as close as possible while also leveraging the UI library
- if some steps cannot be implemented without rewriting parts of the UI library, there should be a discussion between the frontend developer and the designer to adjust the design (source of truth should be design->implementation->design). This should be an exception rather than a rule.
- for every component and page, the following are needed:

  - design (in Figma)
  - isolated components (in Storybook)
  - React components
