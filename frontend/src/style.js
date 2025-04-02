import { makeStyles, typographyStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "20px 20px",
    rowGap: "20px",
  },
  title: typographyStyles.subtitle1,
  card: {
    margin: "auto",
    width: "720px",
    maxWidth: "100%",
    marginBlock: "20px",
  },
});

export default useStyles;
