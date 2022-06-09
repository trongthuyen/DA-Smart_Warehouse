import '../styles/Gas.scss';


function Gas({emit}) {
    return (
      <div className="flex p-4 flex-col h-full">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold">Gas emission</div>
        </div>
        <div className="">Gas Alarm</div>
        {emit ? 
            <div className="Alarm">
                <i className="Phone is-animating"></i>
            </div> :
            <div className="Alarm">
                <i className="Phone"></i>
            </div>
        }
        <div className="flex-grow" />
        <div className="flex justify-center">
          <div className="">Check continously</div>
        </div>
      </div>
    );
  }

export default Gas