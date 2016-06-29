package de.fhws.applab.fiwmodules.api.states;

/**
 * Created by braunpet on 28.04.16.
 */
public class TransitionHelper
{
	public static String queryTemplate( )
	{
		return "/mi/api/mitarbeiter?vorname={VORNAME}&nachname={NACHNAME}&offset={OFFSET}&size={SIZE}";
	}

	public static String queryRelationType( )
	{
		return "find_by_name";
	}
}
