<!-- wp:heading -->
<h2>How you can play with an AWS local simulation environment, to build out, test and experiment.</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>I've been thinking about creating a series of posts for a while about grey-box testing, which I think is the sweet spot for testing, for providing the best return of functional test coverage, with minimal effort.<br><br>Anyway I will deep-dive into particular aspects in due course, but I thought it would be great to start off by building something, utilising test-driven design. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We want something we can visit with our website that will simply return us the classic words "hello world"<br><br>You will need some <code>git</code> / <code>node</code> / <code>npm</code> a code editor and ideally <code>yarn</code> on your machine before we start. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If you don't have yarn, substitute <code>yarn</code> for <code>npm</code> and in the commands that include <code>--dev</code> replace with <code>--save-dev</code>!<br></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>I will pop some links in for their respective setup guides, but other than that, you can be a complete novice to coding, or technical testing, but don't worry, hopefully this set of examples should help you build up some knowledge and confidence to experiment yourself.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Steps we are going to perform<ul><li>Create a git repository</li><li>Create a node project</li></ul><ul><li>Setup a basic typescript project</li></ul><ul><li>Install a testing framework tool</li><li>Created our first failing unit test using Test Driven Design</li><li>Implement some code to pass our unit test</li><li>Setup serverless-offline to emulate our AWS cloud environment</li><li>Test our code</li><li>Create our first integration test.</li></ul></li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>We are going to make a new directory and open vscode</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":236,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-20.29.52.png?w=475" alt="" class="wp-image-236"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><br>Tada!</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":238,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-20.31.44.png?w=1024" alt="" class="wp-image-238"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><br>You can press CTRL-J (cmd if on a mac) to open your terminal in your editor!</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Let's initialise the repo, with <code>git init</code></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  git init


Output:

Initialized empty Git repository in /Users/you54f/dev/saf/dev/githubrepos/tutorials/local-aws-testing/.git/</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>We can now see that we have a <code>master</code> branch. <br><br>Lets initialise this as an npm project, with <code>npm init</code><br><br>You can accept the defaults for now.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install &lt;pkg&gt;` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (local-aws-testing) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
license: (ISC) 
About to write to /Users/you54f/dev/saf/dev/githubrepos/tutorials/local-aws-testing/package.json:

{
  "name": "local-aws-testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
  },
  "author": "YOU54F",
  "license": "ISC"
}


Is this OK? (yes) y</code></pre>
<!-- /wp:code -->

<!-- wp:image {"id":240,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-20.32.48.png?w=1024" alt="" class="wp-image-240"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Let's add typescript to our project with <code>yarn add typescript --dev</code></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ yarn add typescript --dev           
yarn add v1.22.4
info No lockfile found.
&#91;1/4] 🔍  Resolving packages...
&#91;2/4] 🚚  Fetching packages...
&#91;3/4] 🔗  Linking dependencies...
&#91;4/4] 🔨  Building fresh packages...

success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ typescript@4.2.3
info All dependencies
└─ typescript@4.2.3
✨  Done in 2.72s.</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Now we need to initialise our typescript project. Lets add a script into our package.json </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
  "name": "local-aws-testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "init": "tsc --init",
    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
  },
  "author": "YOU54F",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^4.2.3"
  }
}</code></pre>
<!-- /wp:code -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code"></pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:paragraph -->
<p>And run it</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ yarn run init            
yarn run v1.22.4
$ tsc --init
message TS6071: Successfully created a tsconfig.json file.
✨  Done in 0.44s.</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>And lets create our first typescript file</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ mkdir src              
➜  local-aws-testing git:(master) ✗ touch src/handler.ts</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Before we go any further, lets create a <code>.gitignore</code> file, to keep some things out of source control, and add our <code>node_modules</code> folder in for starters!</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":249,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-20.54.18.png?w=944" alt="" class="wp-image-249"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>So our folder structure is looking this so far and we haven't written any code yet!</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":250,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-20.54.54.png?w=1024" alt="" class="wp-image-250"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Let's create an initial commit, and then we can think about writing our Hello World Lambda!</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":252,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-20.56.57.png?w=1001" alt="" class="wp-image-252"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Hooray! Our first commit. Right, so we are building a Hello world Lambda. <br><br>What's a lambda? Basically it's a function, that takes some input, and gets some output. <br><br>Whats our input? Us, or anyone, calling our Lambda function.<br><br>What's our output? Hello world, of course.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>So let's start with a test! <br><br>And for that, we need a testing framework, of which there are many, but today, I will be looking at Jest. </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>jest</li><li>ts-jest</li><li>@types/jest</li></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) yarn add jest ts-jest @types/jest --dev</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>We need to configure ts-jest to setup a config file, that will allow jest to read our typescript files. </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ npx ts-jest config:init

Jest configuration written to "/Users/you54f/dev/saf/dev/githubrepos/tutorials/local-aws-testing/jest.config.js".</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Lets create our file test filee</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ touch src/handler.test.ts</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>So lets write our first test.<br><br>They start with this shape.<br></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>describe("Hello world handler", () =&gt; {
  it("should return hello world", () =&gt; {

  });
});</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Our test has three elements.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Arrange - Where we setup our test conditions</li><li>Act - Where we perform the action against the thing we are testing</li><li>Assert - Where we perform some checks to ensure our output is as we expect</li></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code>describe("Hello world handler", () =&gt; {
  it("should return hello world", () =&gt; {
    // arrange
    const expectedResult = "hello world";

    // act
    const result = "This is where we would call our thing we are testing";

    // assert
    expect(result).toEqual(expectedResult);
  });
});</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph {"align":"left"} -->
<p class="has-text-align-left">Now we want to run our first test. We can update our <code>package.json</code> to include the <code>"test": "jest"</code> script</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
  "name": "local-aws-testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "init": "tsc --init",
    "test": "jest"
  },
  "author": "YOU54F",
  "license": "ISC",
  "devDependencies": {
    "@types/jest": "^26.0.22",
    "jest": "^26.6.3",
    "ts-jest": "^26.5.4",
    "typescript": "^4.2.3"
  }
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Our test failed! Oh no.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":262,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-21.18.19.png?w=1024" alt="" class="wp-image-262"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Oh yeaaaaaah!<br><br>Now, we expected this test to fail. It can't possibly work, right? We haven't written any code yet, other than an assertion that can't possibly pass.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>So lets write some code in our <code>src/handler.ts</code> file.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>export const handler = () =&gt; {
  return "hello world";
};</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>we can run our tests in watch mode, and see the tests update, as we write our code, and try and make the test pass!</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":264,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-21.23.39.png?w=1024" alt="" class="wp-image-264"/></figure>
<!-- /wp:image -->

<!-- wp:code -->
<pre class="wp-block-code"><code> FAIL  src/handler.test.ts
  ● Test suite failed to run

    src/handler.test.ts:7:20 - error TS2304: Cannot find name 'handler'.

    7     const result = handler();
                         ~~~~~~~

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        1.342 s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Let's import our handler and press save and woo! Our test has passed!</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":266,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-21.24.45.png?w=1024" alt="" class="wp-image-266"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><br>Now, let's make our simple handler, an actual piece of code that can run in AWS.<br><br>For that we are going to need</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>aws-sdk</li><li>serverless</li></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ya aws-sdk serverless @types/aws-lambda --dev</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>A lambda function, has an event and a context, let's update our handler to have two parameters, and use the <code>aws-lambda</code> types to help us along a bit</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context
} from "aws-lambda";

export const handler = (
  event: APIGatewayProxyEventV2,
  context: Context
): APIGatewayProxyResultV2 =&gt; {
  return "hello world";
};
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Lets update our test to pass in two parameters</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { handler } from "./handler";

describe("Hello world handler", () =&gt; {
  it("should return hello world", () =&gt; {
    // arrange
    const mockEvent = {} as APIGatewayProxyEventV2;
    const mockContext = {} as Context;
    const expectedResult = "hello world";

    // act
    const result = handler(mockEvent, mockContext);

    // assert
    expect(result).toEqual(expectedResult);
  });
});</code></pre>
<!-- /wp:code -->

<!-- wp:image {"id":272,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-21.44.30.png?w=1024" alt="" class="wp-image-272"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>It's passing! Woohoo. Let's get that commited.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ git add .
Alias tip: ga .
➜  local-aws-testing git:(master) ✗ git commit -m  'if it looks like a lambda, it must be a lambda?'
Alias tip: gcmsg  'if it looks like a lambda, it must be a lambda?'
&#91;master a029d89] if it looks like a lambda, it must be a lambda?
 4 files changed, 3496 insertions(+), 57 deletions(-)</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p> Let's initiate a serverless project, to allow us to package up our lambda function so that it could be deployed to AWS.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ serverless create --template aws-nodejs
Serverless: Generating boilerplate...
 _______                             __
|   _   .-----.----.--.--.-----.----|  .-----.-----.-----.
|   |___|  -__|   _|  |  |  -__|   _|  |  -__|__ --|__ --|
|____   |_____|__|  \___/|_____|__| |__|_____|_____|_____|
|   |   |             The Serverless Application Framework
|       |                           serverless.com, v1.79.0
 -------'

Serverless: Successfully generated boilerplate for template: "aws-nodejs"
Serverless: NOTE: Please update the "service" property in serverless.yml with your service name


   ╭───────────────────────────────────────╮
   │                                       │
   │   Update available 1.79.0 → 2.32.1    │
   │   Run npm i -g serverless to update   │
   │                                       │
   ╰───────────────────────────────────────╯

➜  local-aws-testing git:(master) ✗ 
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Serverless will create us 3 files</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li><code>handler.js</code> - We can delete this as we have created our own</li><li><code>serverless.yml</code> - Where our lambda function is defined, for creation in AWS.</li></ul>
<!-- /wp:list -->

<!-- wp:image {"id":276,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-21.53.38.png?w=543" alt="" class="wp-image-276"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Once we have removed the boilerplate information, our pared down <code>serverless.yml</code> now looks like</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>service: local-aws-testing

provider:
  name: aws
  runtime: nodejs12.x


functions:
  hello:
    handler: src/handler.handler
    events:
      - http:
          path: /{path+}
          method: ANY
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>We are creating a function with path to our source code, and attaching an API Gateway event, which will use a greedy path matcher, to pass any request on any path to our lambda.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>So if my code got deployed to http://mycodeishere.com/</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>And you visited /hello /world /helloworld they should all return <code>hello world</code></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We could deploy this to AWS now, but three things will happen.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>We don't know really know if it will work, bar our test above.</li><li>It definitely won't work, as we need to compile our typescript to javascript!</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Lets sort our the compiling point. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In our <code>tsconfig.json</code> lets specify a</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>a <code>rootDir</code> where our source code lives</li><li>an <code>outDir</code> where our compiled code will live.</li></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
  "compilerOptions": {
    "rootDir": "src",
    "outDir": ".build",
    "target": "es5",
    "module": "commonjs",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>and lets update our package.json file to have a build command. <code>"build": "tsc"</code></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
  "name": "local-aws-testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "init": "tsc --init",
    "test": "jest",
    "build": "tsc"
  },
  "author": "YOU54F",
  "license": "ISC",
  "devDependencies": {
    "@types/aws-lambda": "^8.10.73",
    "@types/jest": "^26.0.22",
    "aws-sdk": "^2.877.0",
    "jest": "^26.6.3",
    "serverless": "^2.32.1",
    "ts-jest": "^26.5.4",
    "typescript": "^4.2.3"
  }
}
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>and lets run it</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ yarn run build       
$ tsc
✨  Done in 1.37s.</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>We can update our function code in <code>serverless.yml</code> to point to the compiled folder <code>bin</code> </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>functions:
  hello:
    handler: src/handler.handler</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>to</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>functions:
  hello:
    handler: bin/handler.handler</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>But instead we are going to use some serverless-plugins to help us along the way</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li><a href="https://www.serverless.com/plugins/serverless-plugin-typescript">serverless-plugin-typescript</a> - Serverless plugin for zero-config Typescript support</li><li><a href="https://github.com/dherault/serverless-offline">serverless-offline</a> - This&nbsp;<a href="https://github.com/serverless/serverless">Serverless</a>&nbsp;plugin emulates&nbsp;<a href="https://aws.amazon.com/lambda">AWS λ</a>&nbsp;and&nbsp;<a href="https://aws.amazon.com/api-gateway">API Gateway</a>&nbsp;on your local machine to speed up your development cycles. To do so, it starts an HTTP server that handles the request's lifecycle like APIG does and invokes your handlers.</li></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code>service: local-aws-testing

provider:
  name: aws
  runtime: nodejs12.x


functions:
  hello:
    handler: src/handler.handler

plugins:
  - serverless-plugin-typescript
  - serverless-offline</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>And lets make sure they are installed.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ yarn add serverless-offline serverless-plugin-typescript --save-dev</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>and add this entry to your package.json in the <code>scripts</code> section.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>"start:offline": "sls offline start"</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>which we can now run</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ yrun start:offline
yarn run v1.22.4
$ sls offline start
Serverless: Compiling with Typescript...
Serverless: Using local tsconfig.json
Serverless: Warning: "rootDir" from local tsconfig.json is overriden
Serverless: Typescript compiled.
Serverless: Watching typescript files...
offline: Starting Offline: dev/us-east-1.
offline: Offline &#91;http for lambda] listening on http://localhost:3002
offline: Function names exposed for local invocation by aws-sdk:
           * hello: local-aws-testing-dev-hello

   ┌─────────────────────────────────────────────────────────────────────────┐
   │                                                                         │
   │   ANY | http://localhost:3000/dev/{path*}                               │
   │   POST | http://localhost:3000/2015-03-31/functions/hello/invocations   │
   │                                                                         │
   └─────────────────────────────────────────────────────────────────────────┘

offline: &#91;HTTP] server ready: http://localhost:3000 🚀
offline: 
offline: Enter "rp" to replay the last request
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Woo! So serverless-offline, is mocking the AWS environment, and providing us an endpoint that we can hit for our hello world lambda.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>On the right hand side, we can see us hitting the endpoint with <br><code>curl -v http://127.0.0.1:3000/dev/hello</code></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":288,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-22.38.26.png?w=1024" alt="" class="wp-image-288"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Spoiler alert:- It never actually returns! We need to return a promise! So lets update out code, and see serverless-offline &amp; serverless-plugin-typescript work in harmony for local development and testing, with hot-reloading.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Let's add the <code>async</code> modifier to the function and change the return type to return a promise. <code>Promise&lt;APIGatewayProxyEventV2&gt;</code></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context
} from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise&lt;APIGatewayProxyResultV2&gt; =&gt; {
  return "hello world";
};</code></pre>
<!-- /wp:code -->

<!-- wp:image {"id":292,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-22.42.10.png?w=1024" alt="" class="wp-image-292"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>We can now see <code>hello world</code> returned to our client!</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If we run our tests again, they fail, as our function is now async, but we just need to await it and add <code>async</code> to the containing function</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { handler } from "./handler";

describe("Hello world handler", () =&gt; {
  it("should return hello world", async () =&gt; {
    // arrange
    const mockEvent = {} as APIGatewayProxyEventV2;
    const mockContext = {} as Context;
    const expectedResult = "hello world";

    // act
    const result = await handler(mockEvent, mockContext);

    // assert
    expect(result).toEqual(expectedResult);
  });
});</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code> PASS  src/handler.test.ts
  Hello world handler
    ✓ should return hello world (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.9 s, estimated 2 s
Ran all test suites related to changed files.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Let's commit our changes so far! run <code>git status</code> to check what we have</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ git status                                                      
Alias tip: g st
On branch master
Changes not staged for commit:
  (use "git add &lt;file&gt;..." to update what will be committed)
  (use "git restore &lt;file&gt;..." to discard changes in working directory)
        modified:   .gitignore
        modified:   package.json
        modified:   src/handler.test.ts
        modified:   src/handler.ts
        modified:   tsconfig.json
        modified:   yarn.lock

Untracked files:
  (use "git add &lt;file&gt;..." to include in what will be committed)
        .build/
        serverless.yml

no changes added to commit (use "git add" and/or "git commit -a")</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><code>.build</code> is our compiled javascript, which we don't want to commit to source control, so lets update our <code>.gitignore</code> file.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code># package directories
node_modules
jspm_packages

# Serverless directories
.serverless

# Build files
.build</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ gcmsg 'serverless config - serverless-offline/serverless-plugin-typescript'
&#91;master 745b338] serverless config - serverless-offline/serverless-plugin-typescript
 7 files changed, 1073 insertions(+), 96 deletions(-)
 create mode 100644 serverless.yml
 rewrite tsconfig.json (99%)</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>So our lambda failed if it wasn't async, and we can run our lambda code offline, with serverless offline, so lets add an integration test, that we can run against a serverless-offline.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In order to create an integration test, our test is going to look very similar, although we are going to need a couple of things</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>a HTTP client library to make a HTTP request to our deployed endpoint. We are going to use <code>axios</code></li><li>An integration test file</li><li>Some configuration to setup the integration test</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Lets add axios</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) yarn add axios --dev                                  </code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>We are going to add three entries </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We are going to create a <code>jest.it.config.js</code> file to target test files that end in <code>it.ts</code></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  test,
  testMatch: &#91;"**/*.it.(ts)"]
};</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>A couple of new script entries in our package.json</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>test - to run the unit tests and integration tests</li><li>test:unit - to run just the unit tests</li><li>test:it - to run the integration tests.</li></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code>  "scripts": {
    "init": "tsc --init",
    "test": "npm run test:unit &amp;&amp; npm run test:it",
    "test:unit": "jest",
    "test:it": "jest --config jest.it.config.js",
    "build": "tsc",
    "start:offline": "sls offline start"
  }</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>We can now right our integration test.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>It looks almost the same as out previous test, which was calling the handler function directly. This test will use axios to hit +</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>import axios from "axios";

describe("Hello world handler integration test", () =&gt; {
  it("should return hello world", async () =&gt; {
    // arrange
    const sutUrl = "http://127.0.0.1:3000/dev/hello";
    const expectedResult = "hello world";

    // act
    const response = await axios.get(sutUrl);

    // assert
    expect(response.data).toEqual(expectedResult);
    expect(response.status).toEqual(200);
  });
});
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Now if we run our integration test with <code>yarn run test:it</code> it will fail (assuming you don't still have serverless-offline running)</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(master) ✗ yrun test:it
yarn run v1.22.4
$ jest --config jest.it.config.js
 FAIL  src/handler.it.ts
  Hello world handler integration test
    ✕ should return hello world (15 ms)

  ● Hello world handler integration test › should return hello world

    connect ECONNREFUSED 127.0.0.1:3000



Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.883 s, estimated 2 s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.</code></pre>
<!-- /wp:code -->

<!-- wp:image {"id":304,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-23.10.34.png?w=1024" alt="" class="wp-image-304"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>So lets start up our app with <code>yarn run start:offline</code> and run our test again</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":306,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-23.13.52.png?w=1024" alt="" class="wp-image-306"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>So great! Lets recap on what we have covered so far.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Scaffolding a basic lambda handler<ul><li>Initialising a git repository</li><li>Initialising an npm project</li></ul><ul><li>Initialising an serverless project</li><li>Initialising a typescript repository</li></ul><ul><li>Initialising a testing framework tool</li><li>Created our first failing unit test</li><li>Created our initial handler</li><li>Made our failing test pass</li><li>Setup serverless-offline to emulate aws offline</li><li>Found our first integration bug</li><li>Wrote out first integration test to cover it</li></ul></li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Phew! That was more than I thought. <br><br>Next time we will be </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Using docker to run our unit and integration tests</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>If you do have AWS credentials setup, you can add the command <code>"deploy": "sls deploy"</code> into your scripts section of your package.json and deploy it to AWS!</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(deploy) ✗ yarn deploy
$ sls deploy
Serverless: Compiling with Typescript...
Serverless: Using local tsconfig.json
Serverless: Warning: "rootDir" from local tsconfig.json is overriden
Serverless: Typescript compiled.
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service local-aws-testing.zip file to S3 (65.65 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............................
Serverless: Stack update finished...
Service Information
service: local-aws-testing
stage: dev
region: us-east-1
stack: local-aws-testing-dev
resources: 11
api keys:
  None
endpoints:
  ANY - https://ag2cvjr9r4.execute-api.us-east-1.amazonaws.com/dev/{path+}
functions:
  hello: local-aws-testing-dev-hello
layers:
  None

**************************************************************************************************************************************
Serverless: Announcing Metrics, CI/CD, Secrets and more built into Serverless Framework. Run "serverless login" to activate for free..
**************************************************************************************************************************************

✨  Done in 262.99s.</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>we can invoke our function now from the command line</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>➜  local-aws-testing git:(deploy) ✗ sls invoke -f hello
"hello world"</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>And we can use our URL that was output in the console to visiit our website, but oh no!</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":328,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/04/screenshot-2021-04-01-at-22.38.51.png?w=1024" alt="" class="wp-image-328"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>We can get some more information from the API log screen</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":333,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/04/screenshot-2021-04-02-at-01.11.29.png?w=1024" alt="" class="wp-image-333"/></figure>
<!-- /wp:image -->

<!-- wp:code -->
<pre class="wp-block-code"><code>Thu Apr 01 21:58:32 UTC 2021 : Sending request to https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-east-1:525422853402:function:local-aws-testing-dev-hello/invocations
Thu Apr 01 21:58:32 UTC 2021 : Received response. Status: 200, Integration latency: 20 ms
Thu Apr 01 21:58:32 UTC 2021 : Endpoint response headers: {Date=Thu, 01 Apr 2021 21:58:32 GMT, Content-Type=application/json, Content-Length=13, Connection=keep-alive, x-amzn-RequestId=035eb943-58c9-451e-aa94-7fc3a11fb91f, x-amzn-Remapped-Content-Length=0, X-Amz-Executed-Version=$LATEST, X-Amzn-Trace-Id=root=1-60664208-52c510e19934133a3c7f7dcc;sampled=0}
Thu Apr 01 21:58:32 UTC 2021 : Endpoint response body before transformations: "hello world"
Thu Apr 01 21:58:32 UTC 2021 : Execution failed due to configuration error: Malformed Lambda proxy response
Thu Apr 01 21:58:32 UTC 2021 : Method completed with status: 502</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>So in order to get API Gateway, we need to update our response. see <a href="https://aws.amazon.com/premiumsupport/knowledge-center/malformed-502-api-gateway/">here</a></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context
} from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise&lt;APIGatewayProxyResultV2&gt; =&gt; {
  return {
    body: "hello world",
    statusCode: 200,
    headers: { "Content-Type:": "text/html" }
  };
};
</code></pre>
<!-- /wp:code -->

<!-- wp:image {"id":334,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://you54f.files.wordpress.com/2021/04/screenshot-2021-04-02-at-01.09.11.png?w=1024" alt="" class="wp-image-334"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
