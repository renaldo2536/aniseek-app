import { Colors } from "@/constants/Colors";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import React, { useCallback, useEffect, useRef } from "react";
import { Keyboard, StyleSheet, View } from "react-native";

interface BottomModalSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  enablePanDownToClose?: boolean;
  snapPoints?: string[];
}

const BottomModalSheet: React.FC<BottomModalSheetProps> = ({
  isVisible,
  onClose,
  children,
  enablePanDownToClose = true,
  snapPoints,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const defaultSnapPoints = snapPoints || ["25%", "50%", "80%"];
  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        Keyboard.dismiss();
        onClose();
      }
    },
    [onClose]
  );

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={isVisible ? 0 : -1}
        enableDynamicSizing={false}
        snapPoints={defaultSnapPoints}
        enablePanDownToClose={enablePanDownToClose}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        handleIndicatorStyle={styles.indicator}
        backgroundStyle={styles.background}
        handleStyle={styles.handle}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="none"
        android_keyboardInputMode="adjustResize"
      >
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheet>
    </Portal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  indicator: {
    backgroundColor: Colors.light.border,
    width: 40,
  },
  background: {
    backgroundColor: "white",
  },
  handle: {
    paddingVertical: 10,
  },
});

export default BottomModalSheet;
