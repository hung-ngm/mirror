"use client"

import * as React from "react"

import Linkify from 'react-linkify';

export const LinkifyText = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    const decorator = (decoratedHref: string, decoratedText: string, key: number) => 
        <a className="underline underline-offset-2 font-bold" 
            target="blank" href={decoratedHref} key={key}>{decoratedText}</a>

    return (
     <Linkify
        componentDecorator={decorator}>
            {children}
     </Linkify>
    ) 
 }
