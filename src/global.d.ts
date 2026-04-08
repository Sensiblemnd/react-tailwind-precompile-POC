declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';

// For CSS module imports like import styles from './file.module.css'
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
