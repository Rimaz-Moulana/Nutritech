import React from 'react';
import ReactPlayer from 'react-player';

function Video() {
    return (
        <div className='player-wrapper'>
            <ReactPlayer
                className='react-player fixed-bottom'
                url='/videos/1707886392619-WhatsApp Video 2023-12-12 at 12.04.12.mp4'
                width='100%'
                height='100%'
                controls={true}
            />
        </div>
    );
}

export default Video;
