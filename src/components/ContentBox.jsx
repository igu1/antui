import React from 'react'

function ContentBox({ height, width, bgcolor, heading, children, padding, margin }) {

    const contentBoxStyle = {
        height: height,
        width: width,
        borderRadius: '15px',
        backgroundColor: bgcolor == null ? '#edf0ee' : bgcolor,
        padding: padding == null ? '20px' : padding,
        margin: margin == null ? '20px' : margin
    }

    return (
        <div style={contentBoxStyle}>
            {heading != null ? (<><h1>{heading}</h1><hr /></>) : ''}
            {children}
        </div>
    )
}

export default ContentBox