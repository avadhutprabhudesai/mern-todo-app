import React from 'react';
import style from './style.module.css';

function SectionDivider({ text }: { text: string }) {
  return (
    <div className={style.section}>
      <div className={style.before}></div>
      <div className={style.sectionText}>{text}</div>
      <div className={style.before}></div>
    </div>
  );
}

export default SectionDivider;
