export function useDynamicAdapt(type = 'max') {
   const className = '_dynamic_adapt_'
   const attrName = 'data-da'

   const dNodes = getDNodes()

   const dMediaQueries = getDMediaQueries(dNodes)

   dMediaQueries.forEach((dMediaQuery) => {
      const matchMedia = window.matchMedia(dMediaQuery.query)
      const filteredDNodes = dNodes.filter(({ breakpoint }) => breakpoint === dMediaQuery.breakpoint)
      const mediaHandler = getMediaHandler(matchMedia, filteredDNodes)
      matchMedia.addEventListener('change', mediaHandler)

      mediaHandler()
   })
   function getDNodes() {
      const result: any = []
      const elements: any = document.querySelectorAll(`[${attrName}]`)
      elements.forEach((element: HTMLElement) => {
         const attr = element.getAttribute(attrName);
         const [toSelector, breakpoint, order]: any = attr?.split(',').map((val: any) => val.trim())
         const to = document.querySelector(toSelector)
         if (to) {
            result.push({
               parent: element.parentElement,
               element,
               to,
               breakpoint: breakpoint ?? '767',
               order: order !== undefined ? (isNumber(order) ? Number(order) : order) : 'last',
               index: -1,
            })
         }
      })

      return sortDNodes(result)
   }

   function getDMediaQueries(items: any) {
      const uniqItems = [...new Set(items.map(({ breakpoint }: any) => `(${type}-width: ${breakpoint}px),${breakpoint}`))]

      return uniqItems.map((item: any) => {
         const [query, breakpoint] = item.split(',')

         return { query, breakpoint }
      })
   }


   function getMediaHandler(matchMedia: any, items: any) {
      return function mediaHandler() {
         if (matchMedia.matches) {
            items.forEach((item: any) => {
               moveTo(item)
            })

            items.reverse()
         } else {
            items.forEach((item: any) => {
               if (item.element.classList.contains(className)) {
                  moveBack(item)
               }
            })

            items.reverse()
         }
      }
   }


   function moveTo(dNode: any) {
      const { to, element, order } = dNode
      dNode.index = getIndexInParent(dNode.element, dNode.element.parentElement)
      element.classList.add(className)

      if (order === 'last' || order >= to.children.length) {
         to.append(element)

         return
      }

      if (order === 'first') {
         to.prepend(element)

         return
      }

      to.children[order].before(element)
   }

   function moveBack(dNode: any) {
      const { parent, element, index } = dNode
      element.classList.remove(className)

      if (index >= 0 && parent.children[index]) {
         parent.children[index].before(element)
      } else {
         parent.append(element)
      }
   }

   function getIndexInParent(element: any, parent: any) {
      return [...parent.children].indexOf(element)
   }


   function sortDNodes(items: any) {
      const isMin = type === 'min' ? 1 : 0

      return [...items].sort((a, b) => {
         if (a.breakpoint === b.breakpoint) {
            if (a.order === b.order) {
               return 0
            }

            if (a.order === 'first' || b.order === 'last') {
               return -1 * isMin
            }

            if (a.order === 'last' || b.order === 'first') {
               return 1 * isMin
            }

            return 0
         }

         return (a.breakpoint - b.breakpoint) * isMin
      })
   }

   function isNumber(value: any) {
      return !isNaN(value)
   }
}

export function uniqArray(array: any[]) {
   return array.filter(function (item: any, index: any, self: any) {
      return self.indexOf(item) === index;
   });
}

export function spollers() {
   const spollersArray = document.querySelectorAll('[data-spollers]');
   if (spollersArray.length > 0) {
      // Получение обычных слойлеров
      const spollersRegular = Array.from(spollersArray).filter(function (item: any, index, self) {
         return !item.dataset.spollers.split(",")[0];
      });
      // Инициализация обычных слойлеров
      if (spollersRegular.length) {
         initSpollers(spollersRegular);
      }
      // Получение слойлеров с медиа запросами
      let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
      if (mdQueriesArray && mdQueriesArray.length) {
         mdQueriesArray.forEach((mdQueriesItem: any) => {
            // Событие
            mdQueriesItem.matchMedia.addEventListener("change", function () {
               initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
         });
      }
      // Инициализация
      function initSpollers(spollersArray: any, matchMedia: any = false) {
         spollersArray.forEach((spollersBlock: any) => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
               spollersBlock.classList.add('_spoller-init');
               initSpollerBody(spollersBlock);
               spollersBlock.addEventListener("click", setSpollerAction);
            } else {
               spollersBlock.classList.remove('_spoller-init');
               initSpollerBody(spollersBlock, false);
               spollersBlock.removeEventListener("click", setSpollerAction);
            }
         });
      }
      // Работа с контентом
      function initSpollerBody(spollersBlock: any, hideSpollerBody = true) {
         let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
         if (spollerTitles.length) {
            spollerTitles = Array.from(spollerTitles).filter((item: any) => item.closest('[data-spollers]') === spollersBlock);
            spollerTitles.forEach((spollerTitle: any) => {
               if (hideSpollerBody) {
                  spollerTitle.removeAttribute('tabindex');
                  if (!spollerTitle.classList.contains('_spoller-active')) {
                     spollerTitle.nextElementSibling.hidden = true;
                  }
               } else {
                  spollerTitle.setAttribute('tabindex', '-1');
                  spollerTitle.nextElementSibling.hidden = false;
               }
            });
         }
      }
      function setSpollerAction(e: any) {
         const el = e.target;
         if (el.closest('[data-spoller]')) {
            const spollerTitle = el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 300;
            if (!spollersBlock.querySelectorAll('._slide').length) {
               if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
                  hideSpollersBody(spollersBlock);
               }
               spollerTitle.classList.toggle('_spoller-active');
               slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
            }
            e.preventDefault();
         }
      }
      function hideSpollersBody(spollersBlock: any) {
         const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
         const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 300;
         if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
            spollerActiveTitle.classList.remove('_spoller-active');
            slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
         }
      }
      // Закрытие при клике вне спойлера
      const spollersClose = document.querySelectorAll('[data-spoller-close]');
      if (spollersClose.length) {
         document.addEventListener("click", function (e) {
            const el: any = e.target;
            if (!el?.closest('[data-spollers]')) {
               spollersClose.forEach(spollerClose => {
                  const spollersBlock: any = spollerClose.closest('[data-spollers]');
                  if (spollersBlock) {
                     if (spollersBlock.classList.contains('_spoller-init')) {
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 300;
                        spollerClose.classList.remove('_spoller-active');
                        slideUp(spollerClose.nextElementSibling, spollerSpeed);
                     }
                  } else {
                     console.log("!!!FLS!!!");
                  }
               });
            }
         });
      }
   }
}

export function slideUp(target: any, duration = 300, showmore = 0) {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = `${target.offsetHeight}px`;
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
         target.hidden = !showmore ? true : false;
         !showmore ? target.style.removeProperty('height') : null;
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         !showmore ? target.style.removeProperty('overflow') : null;
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
         // Создаем событие 
         document.dispatchEvent(new CustomEvent("slideUpDone", {
            detail: {
               target: target
            }
         }));
      }, duration);
   }
}

export function slideDown(target: any, duration = 300, showmore = 0) {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.hidden = target.hidden ? false : null;
      showmore ? target.style.removeProperty('height') : null;
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
         // Создаем событие 
         document.dispatchEvent(new CustomEvent("slideDownDone", {
            detail: {
               target: target
            }
         }));
      }, duration);
   }
}

export function slideToggle(target: any, duration = 300) {
   if (target.hidden) {
      return slideDown(target, duration);
   } else {
      return slideUp(target, duration);
   }
}

export function dataMediaQueries(array: any, dataSetValue: any) {
   // Получение объектов с медиа запросами
   const media = Array.from(array).filter(function (item: any, index: any, self: any) {
      if (item.dataset[dataSetValue]) {
         return item.dataset[dataSetValue].split(",")[0];
      }
   });
   // Инициализация объектов с медиа запросами
   if (media.length) {
      const breakpointsArray: any[] = [];
      media.forEach((item: any) => {
         const params: any = item.dataset[dataSetValue];
         const breakpoint: any = {};
         const paramsArray = params.split(",");
         breakpoint.value = paramsArray[0];
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
         breakpoint.item = item;
         breakpointsArray.push(breakpoint);
      });
      // Получаем уникальные брейкпоинты
      let mdQueries = breakpointsArray.map(function (item) {
         return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mdQueries = uniqArray(mdQueries);
      const mdQueriesArray: any[] = [];

      if (mdQueries.length) {
         // Работаем с каждым брейкпоинтом
         mdQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);
            // Объекты с нужными условиями
            const itemsArray = breakpointsArray.filter(function (item: any) {
               if (item.value === mediaBreakpoint && item.type === mediaType) {
                  return true;
               } return false
            });
            mdQueriesArray.push({
               itemsArray,
               matchMedia
            })
         });
         return mdQueriesArray;
      }
   }
   return false
}