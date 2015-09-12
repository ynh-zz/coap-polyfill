package io.ynh.coap.polyfill;

/**
 * @author Yassin N. Hassan
 * @since 12.09.15.
 */
public class ResponseDefinition {
	private final int code;
	private final String payload;

	public ResponseDefinition(int code, String payload) {
		this.code = code;
		this.payload = payload;
	}
}
