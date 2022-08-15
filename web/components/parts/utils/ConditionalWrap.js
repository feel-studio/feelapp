// USAGE:
/* <ConditionalWrap
  condition={!!condition}
  wrap={(children) => (
    <a href={link} target="_blank" rel="noopener nofollow">
      {children}
    </a>
  )}
>
  Test
</ConditionalWrap>; */

const ConditionalWrap = ({ condition, wrap, children }) =>
  condition ? wrap(children) : children;

export default ConditionalWrap;
