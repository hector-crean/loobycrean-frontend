import type { Action } from ".";

const scrollToBottom: Action = (node) => {
    update: node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
}

export { scrollToBottom };
