import FileItem from 'components/FileItem';
import React from 'react';
import './style.scss';

const ContentTabPaneFile = ({ items }) => {
    return (
        <div id="content-tabpane-file">
            {items.map((item, index) => (
                <FileItem key={index} file={item} inArchive={true} />
            ))}
        </div>
    );
};

export default ContentTabPaneFile;
