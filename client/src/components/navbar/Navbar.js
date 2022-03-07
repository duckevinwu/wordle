import Clock from './Clock';

const Navbar = ({
  className,
  finished,
  active,
  setFinalTime
}) => {
  return (
    <div className={`${className} flex w-full`}>
      <Clock
        className="ml-auto"
        finished={finished}
        active={active}
        setFinalTime={setFinalTime}
      />
    </div>
  )
}

export default Navbar;
