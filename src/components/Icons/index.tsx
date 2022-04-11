import "./icon.css";

const style = {
  borderRadius: "0px 100px 100px 100px",
  minWidth: 12,
  minHeight: 12,
  padding: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

interface ITransitIcon {
  backgroundColor: string;
  transform: string;
  svgTransform: string;
}

export const CommuterRail = (props: ITransitIcon) => (
  <div
    style={{
      ...style,
      transform: props.transform,
      backgroundColor: `#${props.backgroundColor}`,
    }}
    className="marker"
  >
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      color="white"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        color: "white",
        transform: props.svgTransform,
      }}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M4 15.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V5c0-3.5-3.58-4-8-4s-8 .5-8 4v10.5zm8 1.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-7H6V5h12v5z"></path>
    </svg>
  </div>
);

export const Bus = (props: ITransitIcon) => (
  <div
    style={{
      ...style,
      transform: props.transform,
      backgroundColor: `#${props.backgroundColor}`,
    }}
    className="marker"
  >
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      color="white"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        color: "white",
        transform: props.svgTransform,
      }}
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M12 2c-4.42 0-8 .5-8 4v10c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4zm5.66 2.99H6.34C6.89 4.46 8.31 4 12 4s5.11.46 5.66.99zm.34 2V10H6V6.99h12zm-.34 9.74l-.29.27H6.63l-.29-.27A.968.968 0 016 16v-4h12v4c0 .37-.21.62-.34.73z"></path>
      <circle cx="8.5" cy="14.5" r="1.5"></circle>
      <circle cx="15.5" cy="14.5" r="1.5"></circle>
    </svg>
  </div>
);

export const Subway = (props: ITransitIcon) => (
  <div
    style={{
      ...style,
      transform: props.transform,
      backgroundColor: `#${props.backgroundColor}`,
    }}
    className="marker"
  >
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      color="white"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        color: "white",
        transform: props.svgTransform,
      }}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M12 2c-4.42 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm5.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6h-5V6h5v5z"></path>
    </svg>
  </div>
);

export const LiteRail = (props: ITransitIcon) => (
  <div
    style={{
      ...style,
      transform: props.transform,
      backgroundColor: `#${props.backgroundColor}`,
    }}
    className="marker"
  >
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      color="white"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        color: "white",
        transform: props.svgTransform,
      }}
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M19 16.94V8.5c0-2.79-2.61-3.4-6.01-3.49l.76-1.51H17V2H7v1.5h4.75l-.76 1.52C7.86 5.11 5 5.73 5 8.5v8.44c0 1.45 1.19 2.66 2.59 2.97L6 21.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 20h-.08c1.69 0 2.58-1.37 2.58-3.06zm-7 1.56c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5-4.5H7V9h10v5z"></path>
    </svg>
  </div>
);

export const TransitIcons = (props: {
  type: number;
  backgroundColor: string;
  transform: string;
  svgTransform: string;
}) => {
  if (props.type === 0) {
    return <LiteRail {...props} />;
  }
  if (props.type === 1) {
    return <Subway {...props} />;
  }
  if (props.type === 2) {
    return <CommuterRail {...props} />;
  }
  return <Bus {...props} />;
};
