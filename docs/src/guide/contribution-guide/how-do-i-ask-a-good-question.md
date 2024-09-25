---
outline: deep
---

# How do I ask a good question?

We’re happy to help you, but in order to improve your chances of getting an answer, here are some guidelines to follow:

## Before asking a question

**Search and research**, we strongly recommend that you spend a reasonable amount of time researching the problem and searching for existing questions that may provide an answer on google, dictionary, documentation or anywhere else.

**Pretend you're talking to a busy colleague** and have to sum up your entire question in one sentence: what details can you include that will help someone identify and solve your problem? Include any error messages, code examples, or unusual circumstances that make your question clear.

**Introduce the problem before you post any code** Don't just skip straight to the code! It is often helpful to provide some background contextual information, and describing your problem in words is almost as important as describing it with code.

**Help others reproduce the problem** Not all questions benefit from including code, but if your problem is with code you've written, you should include some. But don't just copy in your entire program! Not only is this likely to get you in trouble if you're posting your employer's code, it likely includes a lot of irrelevant details that readers will need to ignore when trying to reproduce the problem. Here are some guidelines:

- Include just enough code to allow others to reproduce the problem
- If it is possible to create a live example of the problem that you can link to, for example:
  - https://mongoplayground.net for reproduce mongodb query
  - https://jsbin.com for reproduce javascript snippet
  - https://stackblitz.com for reproduce entire project
  - https://uno.antfu.me/play for reproduce unocss
  - And also copy the code into the question itself. Not everyone can access external sites, and the links may break over time.
- **DO NOT** post images of code, data, error messages, etc. Please reserve the use of images for diagrams or demonstrating rendering bugs, things that are impossible to describe accurately via text. 

## Proofread your question

Now that you've finished writing your question, take a deep breath and read through it from start to finish. Pretend you're seeing it for the first time: does it make sense? Can someone without all of your context and background knowledge understand it? Try reproducing the problem yourself, in a fresh environment and make sure you can do so using only the information included in your question. Add any details you missed and read through it again. Re-read your title, and make sure that it succinctly and accurately describes the problem.

Also, spelling, grammar, and punctuation are important! If you're not comfortable writing in English, ask someone to proofread it for you.

## Here’s a breakdown of good and bad questions

### Good Question

**Example**

I'm trying to implement a debounce function in JavaScript to optimize my input field's performance. Here’s my current code:

```js:line-numbers
// The debounce function takes two parameters:
// function: The function to debounce.
// wait: The number of milliseconds to wait before invoking function
function debounce(function, wait) {
  // A variable timeout is defined to store the timeout ID.
  let timeout;

  // The debounce function returns a new function that clears the previous 
  // timeout whenever it is called, ensuring that function is executed only 
  // after the specified wait time has passed without another call.
  return function(...args) { // [!code error]
    clearTimeout(timeout); // [!code error]
    timeout = setTimeout(() => { // [!code error]
      function.apply(this, args); // [!code error]
    }, 0); // [!code error] 
  };
}
```

and it’s not working as expected because this code running immediately instead of wait for x miliseconds. What’s missing in this code?

**Expected result**

The debounce function returns a new function that clears the previous timeout whenever it is called, ensuring that function is executed only after the specified wait time has passed without another call.


**Characteristics**
- **Clear and Specific:** Clearly states the problem and what the asker is trying to achieve. 
- **Includes Code:** Provides relevant code snippets to illustrate the issue.
- **Contextual:** Offers context about what the code is meant to do and any errors or issues encountered.
- **Shows Research Effort:** Implies that the asker has tried to solve the issue themselves.

### Bad Question

**Example**

Why error appears when installing nodejs ?

**Characteristics**

- **Vague:** Doesn’t provide any context about the code or the problem.
- **No Code Provided:** Lacks any code snippets for others to analyze.
- **Ambiguity:** There are so many possibilities for errors and expected result if there is no more detailed explanation.
- **No Research Shown:** Doesn’t indicate that the asker has attempted to troubleshoot the issue.
