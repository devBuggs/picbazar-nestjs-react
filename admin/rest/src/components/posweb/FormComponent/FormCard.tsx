// import styles from "../styles/styles.module.scss";

export default function FormCard({ children, currentStep, prevFormStep }: {children: any, currentStep: any, prevFormStep: any}) {
  return (
    <div className={'p-5 '}>
      {currentStep < 5 && (
        <>
          {currentStep > 0 && (
            <button
              className={'text-lg'}
              onClick={prevFormStep}
              type="button"
            >
              back
            </button>
          )}

          <span className={'text-lg'}>Step {currentStep + 1} of 3</span>
        </>
      )}
      {children}
    </div>
  );
}
