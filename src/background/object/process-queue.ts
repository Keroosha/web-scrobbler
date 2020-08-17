/**
 * A function that processes a connector state.
 */
type ProcessFuncion<T> = (state: T) => Promise<unknown>;

/**
 * An object for managing processing data.
 *
 * This object executes an asynchronous callback function for each queued
 * element. The callback is always awaited, so all items are processed in order
 * they added to the queue.
 */
export class ProcessQueue<T> {
	private queue: T[] = [];
	private isBusy = false;

	private callback: ProcessFuncion<T>;

	constructor(callback: ProcessFuncion<T>) {
		this.callback = callback;
	}

	/**
	 * Add a given connector state to the processing queue, and start
	 * processing queue, if it's not started already.
	 *
	 * @param state Connector state
	 */
	enqueue(state: T): void {
		this.queue.push(state);

		if (this.isBusy) {
			return;
		}

		this.processQueue();
	}

	/**
	 * Run callback for every item in the queue.
	 */
	private async processQueue() {
		this.isBusy = true;

		while (this.queue.length > 0) {
			await this.callback(this.queue.shift());
		}

		this.isBusy = false;
	}
}
