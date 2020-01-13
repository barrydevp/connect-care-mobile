import { IntlProvider } from "react-intl";

export default Component => {
  return function(props) {
    return (
      <IntlProvider locale="vi">
        <Component />
      </IntlProvider>
    );
  };
};
