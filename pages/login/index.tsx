import React, { ReactElement } from 'react';
import { FaUser } from 'react-icons/fa';
import { AiFillLock } from 'react-icons/ai';

import styles from './login.module.scss';
import Link from 'next/link';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../config/firebaseConfig';
import CommonLayout from '../../components/Layout/CommonLayout';

const index = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const handleLoginGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        localStorage.setItem('access_token', token || '');
        router.push('/');
      })
      .catch((error) => {
        console.log('tachj');

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="flex items-center w-screen h-screen justify-center bg-[#f8f8f8]">
      <section className={styles['sign-in']}>
        <div className={styles['container-authen']}>
          <div className="signin-content pt-[67px] pb-[87px] flex">
            <div className="signin-image ml-[110px] mr-[20px] mt-[10px] w-6/12 overflow-hidden">
              <figure className="m-0 mb-[50px] text-center">
                <img
                  src="/assets/images/sign-in-image.jpeg"
                  alt="sing up image"
                  className="w-full h-auto "
                />
              </figure>
              <Link
                href="/register"
                className="signup-image-link color-[#222] text-[14px] text-center block"
              >
                Create an account
              </Link>
            </div>
            <div className="signin-form mr-[90px] ml-[80px] w-6/12 overflow-hidden">
              <h2 className={styles['form-title']}>Sign up</h2>
              <form className="register-form w-full block mt-0" id="login-form">
                <div className={styles['form-group']}>
                  <label htmlFor="your_name" className={styles.label}>
                    <FaUser />
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Your Name"
                    className={styles.input}
                  />
                </div>
                <div className={styles['form-group']}>
                  <label htmlFor="your_pass" className={styles.label}>
                    <AiFillLock />
                  </label>
                  <input
                    type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                    className={styles.input}
                  />
                </div>
                <div className={`${styles['form-group']}`}>
                  <button
                    type="button"
                    name="sign-in"
                    id="sign-in"
                    className={`${styles.input} ${styles['btn-submit']}`}
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="social-login flex items-center mt-[80px]">
                <span className="social-label inline-block mr-[15px]">
                  Or login with
                </span>
                <ul className="socials">
                  <li>
                    <button
                      onClick={handleLoginGoogle}
                      type="button"
                      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                    >
                      <img
                        src="/assets/icons/google.svg"
                        alt="gg-icon"
                        className="mr-2 -ml-1 w-4 h-4"
                      />
                      Sign in with Google
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;

index.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
