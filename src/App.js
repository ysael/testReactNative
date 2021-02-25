import './App.css';
import { useEffect, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from "react-native";
import {DATA} from './data'


export const useInvertScrolling = (ref) => {
  useEffect(() => {
    console.log('ref', ref)
    if (!ref.current) {
      return
    }

    const scrollNode = ref.current && ref.current.getScrollableNode()
    if (!scrollNode) {
      return
    }

    const listener = scrollNode.addEventListener('wheel', (e) => {
      scrollNode.scrollTop -= e.deltaY
      e.preventDefault()
    })
    ref.current.setNativeProps({ style: { transform: 'translate3d(0,0,0) scaleY(-1)' } })
    return () => scrollNode.removeEventListener('wheel', listener)
  }, [ref.current]) // needs to run any time flatlist mounts
}
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
function App() {

  const ref = useRef(null)
  useInvertScrolling(ref)
  return (
  <SafeAreaView style={styles.container}>
    <SectionList
      ref={ref}
      inverted
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});

export default App;
