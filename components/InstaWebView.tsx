import React, { useState, useEffect, useRef } from 'react';
import {
	BackHandler,
	RefreshControl,
	ScrollView,
} from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

import { INJECTED_JS_WEBVIEW } from '../contants';

export const InstaWebView = () => {
	const webview = useRef<WebView>(null);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const [isPTREnabled, setPTREnabled] = useState<boolean>(true);
	const [scrollViewHeight, setScrollViewHeight] = useState<number>(0);

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

	const onRefresh = () => {
		setRefreshing(true);
		webview.current?.reload();
	}

	const onMessage = (event: WebViewMessageEvent) => {
		const { data } = event.nativeEvent
		try {
			const { scrollTop } = JSON.parse(data)
			setPTREnabled(scrollTop < 10)
		} catch (error) { }
	}

	return (
		<ScrollView
			contentContainerStyle={{ flex: 1, height: '100%' }}
			onLayout={e => setScrollViewHeight(e.nativeEvent.layout.height)}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					progressViewOffset={100}
					enabled={isPTREnabled}
				/>
			}
		>
			<WebView
				source={{ uri: 'https://instagram.com/' }}
				style={{ marginTop: 24, height: scrollViewHeight }}
				ref={webview}
				onMessage={onMessage}
				onLoadEnd={e => setRefreshing(false)}
				injectedJavaScript={INJECTED_JS_WEBVIEW}
			/>
		</ScrollView>
	);
};
