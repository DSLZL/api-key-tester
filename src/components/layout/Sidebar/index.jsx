import React, { useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { useAppState } from '../../../contexts/AppStateContext';
import PaidDetectionPrompt from '../../features/PaidDetectionPrompt';
import styles from './Sidebar.module.css';

const ApiProvider = ({ type, icon, name, isActive, onClick, isCollapsed }) => (
  <div
    className={`${styles.apiProvider} ${isActive ? styles.active : ''}`}
    onClick={() => onClick(type)}
    title={isCollapsed ? name : ''}
    data-tooltip={name}
  >
    <div className={styles.providerIcon}>{icon}</div>
    <span className={styles.providerName}>
      {name}
    </span>
  </div>
);

const Sidebar = ({ isCollapsed }) => {
  const { t } = useLanguage();
  const { state, dispatch } = useAppState();
  const [showPaidDetectionPrompt, setShowPaidDetectionPrompt] = useState(false);

  const checkPaidDetectionPrompt = (apiType) => {
    if (apiType !== 'gemini') return false;

    const promptDisabled = localStorage.getItem('geminiPaidDetectionPromptDisabled') === 'true';
    if (promptDisabled) {
      const defaultSetting = localStorage.getItem('geminiPaidDetectionDefault') === 'true';
      dispatch({ type: 'SET_PAID_DETECTION', payload: defaultSetting });
      return false;
    }

    return true;
  };

  const handleApiTypeChange = (apiType) => {
    dispatch({ type: 'SET_API_TYPE', payload: apiType });
    dispatch({ type: 'CLEAR_DETECTED_MODELS' });

    if (checkPaidDetectionPrompt(apiType)) {
      setShowPaidDetectionPrompt(true);
    }
  };

  const apiProviders = [
    {
      type: 'openai',
      icon: (
        <svg fill="currentColor" fillRule="evenodd" height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg" style={{ flex: '0 0 auto', lineHeight: 1 }}>
          <title>OpenAI</title>
          <path d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z"></path>
        </svg>
      ),
      name: 'OpenAI'
    },
    {
      type: 'gemini',
      icon: (
        <svg height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg" style={{ flex: '0 0 auto', lineHeight: 1 }}>
          <title>Gemini</title>
          <defs>
            <linearGradient id="lobe-icons-gemini-fill" x1="0%" x2="68.73%" y1="100%" y2="30.395%">
              <stop offset="0%" stopColor="#1C7DFF"></stop>
              <stop offset="52.021%" stopColor="#1C69FF"></stop>
              <stop offset="100%" stopColor="#F0DCD6"></stop>
            </linearGradient>
          </defs>
          <path d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12" fill="url(#lobe-icons-gemini-fill)" fillRule="nonzero"></path>
        </svg>
      ),
      name: 'Gemini'
    },
    {
      type: 'claude',
      icon: (
        <svg height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg" style={{ flex: '0 0 auto', lineHeight: 1 }}>
          <title>Claude</title>
          <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill="#D97757" fillRule="nonzero"></path>
        </svg>
      ),
      name: 'Claude'
    },
  ];

  return (
    <>
      <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
        <div className={styles.providersSection}>
          {apiProviders.map((provider) => (
            <ApiProvider
              key={provider.type}
              type={provider.type}
              icon={provider.icon}
              name={provider.name}
              isActive={state.apiType === provider.type}
              onClick={handleApiTypeChange}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>

      <PaidDetectionPrompt
        isOpen={showPaidDetectionPrompt}
        onClose={() => setShowPaidDetectionPrompt(false)}
        onConfirm={(enablePaidDetection) => {
          dispatch({ type: 'SET_PAID_DETECTION', payload: enablePaidDetection });
        }}
      />
    </>
  );
};

export default Sidebar;
