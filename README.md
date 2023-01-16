
<span style='counter-reset: footnote;'><span>
 
# UniTeX
A transpiler that converts TeX into Unicode (as possible). 

2023/1/16

## In-progress

- **Some basic or commonly used macro commands**. ideally including but not limited to the functions in [MathJax](https://www.mathjax.org/) and [KaTeX](https://katex.org), They have some differences in the supported macros. This project will prefer the latter design (i.e. [Supported Functions](https://katex.org/docs/supported.html)).

- **A website convenient for input and output**. [source code repository](https://github.com/kokic/UniTeX-Website).

- **Additional unicode characters** and corresponding macro commands ([BabelMap](https://www.babelstone.co.uk/Unicode/babelmap.html)). This is mainly for the macro commands that exist in the common packages of TeX, which are not implemented by KaTeX or MathJax but are supported by Unicode.

- **Various Tables**. 
Although UniTeX faces similar problems <sup><a id='tables-packages-back' href='#tables-packages'>[1]</a></sup>
, it is much easier to implement for UniTeX, the really important problem is the font, because the unique spacing of the non-monospace (equal width) font may cause the elements such as the border to not be aligned, but this is completely determined by the user or the platform it is displayed on therefore, users can only be advised to use monospace-like fonts <sup><a id='tables-remedies-back' href='#tables-remedies'>[2]</a></sup>. 

## Future

- **The output is syntactically compatible with [AsciiMath](http://asciimath.org)**, which may be used as the default style or an optional setting. 

- **Terminal versions (in other languages)**. It is suitable for some environments with high performance requirements, so the JVM family (Java, Kotlin, etc.) or Rust will be given priority in language selection. 

<!-- ## Demo -->

<!-- ## Documentation -->


---

## Development

- node.js

## Build

- node.js
- webpack
```
webpack ./unitex.js --mode=none
```

--- 

<a id='tables-packages' href='#tables-packages-back'>[1].</a>
Perhaps due to the complexity of macro packages itself in history, KaTeX does not support any form of table environment at present (of course, the array environment is sufficient for some simple cases, so it is not a big problem for KaTeX from the perspective of basic functions). 


<a id='tables-remedies' href='#tables-remedies-back'>[2].</a>
There may be some remedies, it is conceivable that they are not completely effective.

