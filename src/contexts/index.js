import React from 'react';
import { NoteProvider } from './note.context';

function ProviderComposer({ contexts, children }) {
    return contexts.reduceRight((kids, parent) => (
        React.cloneElement(parent, {
            children: kids
        })
    ), children)
}

const GlobalContext = (props) => {
    const contexts = [ 
        <NoteProvider/>,
    ];
    
    return (
        <ProviderComposer contexts={contexts}>
            { props.children }
        </ProviderComposer>
    )
} 

export default GlobalContext;
