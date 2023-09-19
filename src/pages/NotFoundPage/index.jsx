import React, { memo } from 'react';

function NotFoundPage(props) {
    return (
        <div className='text-center fs-1'>
            404 Not Found
        </div>
    );
}

export default memo(NotFoundPage);