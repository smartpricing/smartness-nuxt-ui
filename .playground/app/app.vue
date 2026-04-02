<template>
	<Html class="smooth-scroll overflow-x-hidden">
		<Body class="font-default antialiased">
			<UApp :locale="locales.it">
				<NuxtLayout>
					<NuxtPage />
				</NuxtLayout>
			</UApp>
		</Body>
	</Html>
</template>

<script setup lang="ts">
	import * as locales from "../../app/locale";
</script>
