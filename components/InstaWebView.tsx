import React, { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';

import { WebView } from 'react-native-webview';

export const InstaWebView = () => {
	const webview = useRef<WebView>(null);
	useEffect(() => {
		const backAction = () => {
			if (webview.current) {
				webview.current.goBack();
			}
			return true;
		};
		const back = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		);
		return () => back.remove();
	}, [webview]);

	return (
		<WebView
			source={{ uri: 'https://instagram.com/' }}
			style={{ marginTop: 24 }}
			ref={webview}
		/>
	);
};
