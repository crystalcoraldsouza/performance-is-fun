import { useRef, useEffect } from "react";
import styles from "./ContactUs.module.css";

const ContactUs = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const form = formRef.current;
    const button = buttonRef.current;

    if (!form || !button) return;

    const updateButtonState = () => {
      button.disabled = !form.checkValidity();
    };

    // listen to ALL input changes
    form.addEventListener("input", updateButtonState);

    // initial check
    updateButtonState();

    return () => {
      form.removeEventListener("input", updateButtonState);
    };
  }, []);
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const message = messageRef.current?.value;

    alert(
      `Message sent successfully! Name:${name}, Email: ${email}, Message: ${message}`,
    );
    if (nameRef.current) nameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (messageRef.current) messageRef.current.value = "";
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
        <h2 className={styles.header}>Contact Us</h2>
        <section className={styles.formSection}>
          <div className={styles.formRow}>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
            <input
              id="name"
              placeholder="Your Name"
              type="text"
              ref={nameRef}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              id="email"
              placeholder="Your Email"
              type="email"
              ref={emailRef}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="message" className={styles.label}>
              Message:
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              rows={4}
              ref={messageRef}
              className={styles.textarea}
              required
            />
          </div>

          <button type="submit" className={styles.button} ref={buttonRef}>
            Send
          </button>
        </section>
      </form>
    </div>
  );
};

export default ContactUs;
