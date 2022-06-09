import clsx from "https://cdn.skypack.dev/clsx@1.1.1";


  function Image({ path = '1', className = 'w-4 h-4' }) {
    return (
      <img
        src={`${path}`}
        alt=""
        className={clsx(className, 'rounded-full')}
      />
    );
  }

export default Image