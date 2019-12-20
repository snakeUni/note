import * as React from "react";
import { Link } from "react-router-dom";

export function createResource(getPromise) {
  const cache = {};
  const errors = {};
  const onWay = {};

  function load(key) {
    onWay[key] = getPromise(key)
      .then(res => {
        delete onWay[key];
        cache[key] = res;
      })
      .then(error => {
        errors[key] = error;
      });

    return onWay[key];
  }

  function preload(key) {
    if (cache[key] !== undefined || onWay[key]) return;
    load(key);
  }

  function read(key) {
    if (cache[key] !== undefined) {
      return cache[key];
    } else if (errors[key]) {
      throw errors[key];
    } else if (onWay[key]) {
      throw onWay[key];
    } else {
      throw load(key);
    }
  }

  function clear(key) {
    if (key) {
      delete cache[key];
    } else {
      cache = {};
    }
  }

  function ResourceLink({ cacheKey, ...props }) {
    const _preload = () => preload(cacheKey);
    return <Link onMouseEnter={_preload} onFocus={_preload} {...props} />;
  }

  return { preload, read, clear, Link: ResourceLink };
}
