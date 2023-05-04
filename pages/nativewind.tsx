import { Inter } from 'next/font/google'
import { View, Text, Image, Linking } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const MonoText = (props: any) => (
  <StyledText  {...props}>
    <StyledText className='font-mono'>
      {props.children}
    </StyledText>
  </StyledText>
);

const InterText = (props: any) => (
  <StyledText  {...props}>
    <StyledText className={inter.className}>
      {props.children}
    </StyledText>
  </StyledText>
);

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <StyledView
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <StyledView className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex lg:flex-row">
        <MonoText className={`fixed left-0 top-0 flex w-full justify-center items-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 text-white`}>
          Get started by editing&nbsp;
          <MonoText className="font-bold">pages/index.tsx</MonoText>
        </MonoText>
        <StyledView className="fixed bottom-0 left-0 flex flex-row h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <InterText
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 text-white"
            onPress={() => {
              Linking.openURL('https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app')
            }}
          >
            By{' '}
            <StyledImage
              className="dark:invert w-28 h-6"
              source={{ uri: "/vercel.svg" }}
              alt="Vercel Logo"
            />
          </InterText>
        </StyledView>
      </StyledView>

      <StyledView className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <StyledImage
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-44 h-9"
          source={{ uri: "/next.svg" }}
          alt="Next.js Logo"
        />
      </StyledView>

      <StyledView className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <InterText
          onPress={() => {
            Linking.openURL('https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app')
          }}
          className="text-white text-center group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <StyledView>
            <InterText className={`mb-3 text-2xl font-semibold`}>
              Docs{' '}
              <InterText className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </InterText>
            </InterText>
          </StyledView>
          <StyledView>
            <InterText className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about Next.js features and API.
            </InterText>
          </StyledView>
        </InterText>

        <InterText
          onPress={() => {
            Linking.openURL('https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app')
          }}
          className="text-white text-center group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <StyledView>
            <InterText className={`mb-3 text-2xl font-semibold`}>
              Learn{' '}
              <InterText className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </InterText>
            </InterText>
          </StyledView>
          <StyledView>
            <InterText className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </InterText>
          </StyledView>
        </InterText>

        <InterText
          onPress={() => {
            Linking.openURL('https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app')
          }}
          className="text-white text-center group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <StyledView>
            <InterText className={`mb-3 text-2xl font-semibold`}>
              Templates{' '}
              <InterText className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </InterText>
            </InterText>
          </StyledView>
          <StyledView>
            <InterText className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </InterText>
          </StyledView>
        </InterText>

        <InterText
          onPress={() => {
            Linking.openURL('https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app')
          }}
          className="text-white text-center group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <StyledView>
            <InterText className={`mb-3 text-2xl font-semibold`}>
              Deploy{' '}
              <InterText className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </InterText>
            </InterText>
          </StyledView>
          <StyledView>
            <InterText className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </InterText>
          </StyledView>
        </InterText>
      </StyledView>
    </StyledView>
  )
}
