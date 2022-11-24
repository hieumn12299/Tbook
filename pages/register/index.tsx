import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { MdPassword } from 'react-icons/md';
import styles from './register.module.scss';

const Register = () => {
  return (
    <div className="flex items-center w-screen h-screen justify-center bg-[#f8f8f8]">
      <section className={`${styles['sign-up']} w-full`}>
        <div className={styles['container-authen']}>
          <div className="signup-content py-[75px] flex">
            <div className="signup-form mx-[75px] pl-[34px] w-6/12 overflow-hidden">
              <h2 className={`${styles['form-title']} mb-[33px]`}>Sign up</h2>
              <form className="register-form w-full">
                <div className={styles['form-group']}>
                  <label className={styles.label} htmlFor="name">
                    <FaUser />
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    className={styles.input}
                  ></input>
                </div>
                <div className={styles['form-group']}>
                  <label className={styles.label} htmlFor="email">
                    <IoMdMail />
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Your email"
                    className={styles.input}
                  ></input>
                </div>
                <div className={styles['form-group']}>
                  <label htmlFor="password" className={styles.label}>
                    <MdPassword />
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className={styles.input}
                  ></input>
                </div>
                <div className={styles['form-group']}>
                  <label htmlFor="repeat-password" className={styles.label}>
                    <MdPassword />
                  </label>
                  <input
                    type="password"
                    name="repeat-passowrd"
                    id="repeat-password"
                    placeholder="Repeat your password"
                    className={styles.input}
                  ></input>
                </div>
                <div className={styles['form-group']}>
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    className={`${styles.input} ${styles.checkbox}`}
                  />
                  <label
                    htmlFor="agree-term"
                    className="mt[6px] inline-block leading-[1.5em] relative top-0 left-0 color-[#333]"
                  >
                    <span>
                      <span></span>
                    </span>
                    I agree all statements in{' '}
                    <a href="#" className="term-service">
                      Terms of service
                    </a>
                  </label>
                </div>
                <div className={`${styles['form-group']} mb-0`}>
                  <button
                    type="button"
                    name="signup"
                    id="signup"
                    className={`${styles.input} ${styles['btn-submit']}`}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
            <div className="signup-image mx-0 my-[55px] mt-[45px] w-6/12 overflow-hidden">
              <figure className="m-0 mb-50 text-center">
                <img
                  className="max-w-full h-auto"
                  src="/assets/images/sign-up-image.jpg"
                  alt="register-img"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
