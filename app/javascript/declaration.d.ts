declare module '*.mp3';

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
