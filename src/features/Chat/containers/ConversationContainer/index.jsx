// import ConversationSingle from 'features/Chat/components/ConversationSingle';
import React from 'react';

import './style.scss';
function ConversationContainer() {
    return (
        <>
            <div id="conversation-main">
                <ul className="list_conversation">
                    {/* <li>
                        <ConversationSingle />
                    </li> */}
                </ul>
            </div>
        </>
    );
}

export default ConversationContainer;
