import rTabs from './utils/rTabs';

const examples = {
    'monaco-example': rTabs(`
    # Primes

    It's a playground for examining and playing with prime numbers. It also gives an opportunity to write custom formulas and visualize the results.

    ### Demo

    You can try it simply by opening this [link](https://primes.surenatoyan.com/)

    ### Development

    You also can set up it on your local machine for development (or other) purposes. For that you need:

     - [Nodejs](https://nodejs.org/en/)
     - npm (it comes with nodejs) - or [yarn](https://yarnpkg.com/en/)

    Run these commands to clone the repository, install dependencies and run the application.

    1) \`git clone https://github.com/SurenAt93/primes.git\`
    2) \`cd primes\`
    3) \`npm install\` (or if you are using yarn, just \`yarn\`)
    4) \`npm run start\` (or \`yarn start\` in case of yarn)

    That's it. After, open \`localhost:3000\` in your browser.
    Note that by these steps you run the application in development mode. So, you can open the source of it in your preferred text editor and do whatever you want.

    To make a production build after the third step run - \`npm run build\` (or \`yarn build\` in case of yarn). After a successful build, you will have a production ready app in the build folder.

    # GFM

    ## Autolink literals
    
    www.example.com, https://example.com, and contact@example.com.
    
    ## Footnote
    
    A note[^1]
    
    [^1]: Big note.
    
    ## Strikethrough
    
    ~one~ or ~~two~~ tildes.
    
    ## Table
    
    | a | b  |  c |  d  |
    | - | :- | -: | :-: |
    
    ## Tasklist
    
    * [ ] to do
    * [x] done
    `)
};

export default examples;