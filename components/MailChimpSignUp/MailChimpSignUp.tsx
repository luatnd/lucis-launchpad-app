import { DetailedHTMLProps } from "react";
import { useCallback, useState } from "react";
// @ts-ignore
import MailchimpSubscribe from "react-mailchimp-subscribe";
import AnimWhenVisible from "../Anim";
import s from "./MailChimpSignUp.module.sass";

type AppMailChimpPayload = {
  EMAIL: string,
  INVESTOR?: number,
  SCHOLAR?: number,
}

export enum AppMailChimpFormSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

type Props = DetailedHTMLProps<any, any> & {
  size?: AppMailChimpFormSize,
  isInvestor?: boolean,
  isScholar?: boolean,
}
export default function MailChimpSignUp(props: Props) {
  let {
    isInvestor,
    isScholar,
    size,
    ...restProps
  } = props;

  const url = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  if (!size) {
    size = AppMailChimpFormSize.lg
  }

  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);



  const onSubmit = useCallback(
    (subscribe) => {
      if (!email) {
        setHasError(true);
        setMsg("Please enter your email");
        return;
      }

      if (hasError) {
        setMsg("Could not subscribe at this time");
        return;
      }

      setMsg("Subscribing ...");

      const payload: AppMailChimpPayload = {EMAIL: email}
      if (isInvestor) {
        payload.INVESTOR = 1;
      }
      if (isScholar) {
        payload.SCHOLAR = 1;
      }

      subscribe(payload);

      setTimeout(() => {
        setMsg("Successfully subscribed, thanks you!");
        setTimeout(() => {
          setMsg("");
        }, 10000);
      }, 2000);
    },
    [
      email, hasError,
      isInvestor,
      isScholar,
    ]
  );

  const validateEmail = (email: string): boolean => {
    if (!email) {
      return true;
    }

    return (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null
    );
  };

  const onInput = useCallback((e) => {
    const email = e.target.value;
    setEmail(email);

    const valid = validateEmail(email);
    if (valid) {
      setHasError(false);
      setMsg("");
    } else {
      setHasError(true);
      setMsg("Please enter a correct email");
    }
  }, []);

  const transformMessage = (message: string): string => {
    if (!message) {
      return message;
    }

    const alreadySubIdx = message.indexOf("already subscribed");
    if (alreadySubIdx > -1) {
      return message.substring(0, alreadySubIdx + 18);
    }

    return message;
  };

  return (
    <div className={`mc_${size} ${s.emailForm}`} {...restProps}>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }: any) => (
          <>
            <AnimWhenVisible
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -20 },
              }}
            >
              <p className={s.title}>SUBSCRIBE TO OUR NEWSLETTER</p>
            </AnimWhenVisible>
            <AnimWhenVisible
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 20 },
              }}
            >
              <div className={s.form}>
                <div className={s.inputC}>
                  <input
                    type="text"
                    className={s.input}
                    placeholder="your.email@example.com"
                    onInput={onInput}
                    onChange={onInput}
                  />
                </div>
                <button
                  className={s.btn}
                  onClick={() => onSubmit(subscribe)}
                  disabled={hasError}
                >
                  Subscribe
                </button>
              </div>
            </AnimWhenVisible>

            {status === "error" ? (
              <p
                className={`${s.msg} ${s.hasError}`}
                dangerouslySetInnerHTML={{
                  __html: transformMessage(message),
                }}
              />
            ) : (
              <p className={`${s.msg} ${hasError ? s.hasError : ""}`}>
                {msg}
              </p>
            )}
          </>
        )}
      />
    </div>
  )
}