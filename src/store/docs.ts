// 引入defineStore用于创建store
import { defineStore } from 'pinia'

// 定义并暴露一个store
export const useDocsStore = defineStore('docs', {
	// 动作
	actions: {},
	// 状态
	state() {
		return {
			editDocuments: [
				{
					id: "001",
					type: 'text',
					name: "demo1",
					owner: "demo1",
					knowledge: "knowledge1",
					time: "2024-06-11 13:13"
				},
				{
					id: "002",
					type: 'text',
					name: "demo2",
					owner: "demo2",
					knowledge: "knowledge2",
					time: "2024-06-09 16:46"
				},
				{
					id: "003",
					type: 'text',
					name: "demo1",
					owner: "demo1",
					knowledge: "knowledge1",
					time: "2024-06-11 13:13"
				},
				{
					id: "004",
					type: 'text',
					name: "demo1",
					owner: "demo1",
					knowledge: "knowledge1",
					time: "2024-06-11 13:13"
				},
				{
					id: "005",
					type: 'text',
					name: "demo1",
					owner: "demo1",
					knowledge: "knowledge1",
					time: "2024-06-11 13:13"
				},
				{
					id: "006",
					type: 'text',
					name: "demo1",
					owner: "demo1",
					knowledge: "knowledge1",
					time: "2024-06-11 13:13"
				},
				{
					id: "007",
					type: 'text',
					name: "demo1",
					owner: "demo1",
					knowledge: "knowledge1",
					time: "2024-06-11 13:13"
				}
			],

			lookedDocuments: [
				{
					id: "001",
					type: 'text',
					name: "demo1",
					owner: "demo1",
					knowledge: "knowledge1",
					time: "2024-06-11 13:13"
				},
				{
					id: "002",
					type: 'text',
					name: "demo2",
					owner: "demo2",
					knowledge: "knowledge2",
					time: "2024-06-09 16:46"
				},
				{
					id: "003",
					type: 'text',
					name: "demo1",
					owner: "demo1",
					knowledge: "knowledge1",
					time: "2024-06-11 13:13"
				},
				{
					id: "004",
					type: 'text',
					name: "demo1",
					owner: "demo1",
					knowledge: "knowledge1",
					time: "2024-06-11 13:13"
				},
				{
					id: "005",
					type: 'text',
					name: "demo1",
					owner: "demo1",
					knowledge: "knowledge1",
					time: "2024-06-11 13:13"
				},
				{
					id: "006",
					type: 'text',
					name: "demo1",
					owner: "demo1",
					knowledge: "knowledge1",
					time: "2024-06-11 13:13"
				},
				{
					id: "007",
					type: 'text',
					name: "demo1",
					owner: "demo1",
					knowledge: "knowledge1",
					time: "2024-06-11 13:13"
				}
			]
		}
	},
	// 计算
	getters: {
		editKbs(): string[] {
			let set = new Set()
			for (const doc of this.editDocuments) {
				set.add(doc.knowledge)
			}
			return Array.from(set)
		},
		editCreaters(): string[] {
			let set = new Set()
			for (const doc of this.editDocuments) {
				set.add(doc.owner)
			}
			return Array.from(set)
		},
		lookedKbs(): string[] {
			let set = new Set()
			for (const doc of this.lookedDocuments) {
				set.add(doc.knowledge)
			}
			return Array.from(set)
		},
		lookedCreaters(): string[] {
			let set = new Set()
			for (const doc of this.lookedDocuments) {
				set.add(doc.owner)
			}
			return Array.from(set)
		}
	}
})