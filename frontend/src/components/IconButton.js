

function IconButton({
    onClick = () => {},
    icon = 'options',
    className = 'w-4 h-4',
  }) {
    return (
      <button onClick={onClick} type="button" className={className}>
        <img
          src={`${icon}`}
          alt=""
          className="w-full h-full"
        />
      </button>
    );
  }

export default IconButton