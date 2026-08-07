# Testid gaps — difetti di questa repo

Nodi che lo standard `data-testid` richiede di poter marcare e che **i nostri componenti** oggi non espongono. La causa è in `app/components/`, non a monte: i limiti di `@nuxt/ui` / `reka-ui` stanno in [`docs/upstream/`](../upstream/README.md).

**Questo file registra, non risolve.** Tapparli è lavoro di un'altra mappa: la mappa dello standard testid ha dichiarato *out of scope* l'esporre nuove prop di raggiungibilità sui componenti. Qui si nomina il buco, con la citazione al sorgente, così chi apre quella mappa parte da un elenco verificato invece che da zero.

Ogni voce porta: **sintomo** · **causa** (file e riga) · **cosa serve**.

## `SFormField` ingoia gli attributi di chi lo usa come root

**Sintomo.** `<SSlider data-testid="prezzo" />` non produce nessun `data-testid` sullo slider. L'attributo finisce su `UFormField`, cioè sul contenitore label+help, non sul controllo.

**Causa.** `app/components/FormField/SFormField.vue:2,19` — `inheritAttrs: false` e `$attrs` girati a `UFormField`. Ogni componente che monta `SFormField` come root eredita il comportamento.

**Cosa serve.** Decidere se il fallthrough su un componente-controllo debba raggiungere il controllo o il form field. Il corollario dello standard («un `data-testid` sul componente arriva sempre almeno al root») qui è rispettato alla lettera e tradito nella sostanza: il nodo marcato non è quello su cui il QA agisce, e nemmeno un suo antenato utile.

## `SDatePicker` e `SDataCalendar` scartano `$attrs` in silenzio

**Sintomo.** `<SDatePicker data-testid="x" />` compila, renderizza, e l'attributo non esiste da nessuna parte. Nessun warning.

**Causa.** Entrambi hanno `inheritAttrs: false` e non ribindano mai `$attrs`.

**Cosa serve.** Ribindare `$attrs` sul root. Sono proprio i due componenti con la meccanica di raggiungibilità migliore (prop `attributes` a chiave di nodo, 6 e 11 chiavi) — la via ovvia fallisce in silenzio su quelli che gestiscono meglio il caso difficile.

## `SMultiSelect` non inoltra nulla al proprio trigger

**Sintomo.** Trigger, input di ricerca, select-all e righe degli item sono irraggiungibili. Solo il root, e nemmeno quello.

**Causa.** Root `UPopover`, che perde gli attrs a monte → [`nuxt-ui-popover-attrs-dropped`](../upstream/nuxt-ui-popover-attrs-dropped.md). Ma anche accantonato l'upstream, `SMultiSelect` non dichiara né inoltra `class`, non espone `attributes`, e `ui.trigger` è solo `ClassNameValue` (`app/components/MultiSelect/types.ts:26`).

**Cosa serve.** `inheritAttrs: false` più `v-bind="$attrs"` sul trigger risolve senza aspettare upstream. Workaround disponibile oggi: lo slot `#trigger` (`SMultiSelect.vue:10-15`), che però costringe l'app a reimplementare il trigger solo per marcarlo.

## `SStepper` e `SActionsGroup` — stato disomogeneo

**Sintomo.** `SActionsGroup` supporta già gli attributi per item (`...rest` → `v-bind="entry.button"`, `app/components/ActionsGroup/SActionsGroup.vue:18,202-203`). `SStepper` ha il root raggiungibile ma nessun aggancio per singolo step.

**Cosa serve.** Allineare `SStepper` alla convenzione degli attributi nell'oggetto item, già canonica nella guida.

## `SNavigationShell` e `SNavigationProducts` — i 4 testid hardcoded

**Sintomo.** Sono gli unici `data-testid` presenti nel layer, su nodi che nessuna prop espone.

**Stato.** Non è un buco: la mappa ha deciso che restano, come eccezione lecita — il layer può marcare un nodo quando il componente è singleton per applicazione e il nodo non è altrimenti raggiungibile. In cambio quegli id sono API pubblica e rinominarli è breaking change.

**Cosa serve.** Nulla qui. Resta da decidere, scrivendo la guida, se il criterio del singleton si estenda agli altri componenti di navigazione.
